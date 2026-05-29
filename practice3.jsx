import { useState } from "react";

const data = {
  intro: {
    title: "Computer Graphics & OpenGL Complete Guide",
    subtitle: "OpenGL + GLUT + FreeGLUT — সম্পূর্ণ বাংলা টিউটোরিয়াল",
    overview: `
Computer Graphics হলো কম্পিউটার ব্যবহার করে visual content তৈরি, প্রদর্শন এবং manipulation করার বিজ্ঞান ও শিল্প।

OpenGL (Open Graphics Library) হলো একটি cross-platform, cross-language API যা 2D এবং 3D graphics render করার জন্য ব্যবহৃত হয়।

GLUT (OpenGL Utility Toolkit) এবং FreeGLUT হলো OpenGL এর সাথে window management, input handling ইত্যাদির জন্য utility library।

এই tutorial এ আমরা শিখব:
• Computer Graphics এর মূল concepts
• OpenGL এর সব core functions
• GLUT / FreeGLUT এর সব functions
• 2D ও 3D rendering
• Transformations, Lighting, Texturing
• Animation ও Interaction
    `
  },
  cgTopics: [
    {
      id: "cg1",
      title: "📐 Computer Graphics Fundamentals",
      topics: [
        { name: "Raster vs Vector Graphics", explanation: `Raster Graphics: Pixel দিয়ে তৈরি। প্রতিটি pixel এর color value সংরক্ষিত থাকে। Zoom করলে blur হয়। উদাহরণ: PNG, JPEG, BMP।\n\nVector Graphics: Mathematical equations দিয়ে shapes define করা হয়। যেকোনো size এ sharp থাকে। উদাহরণ: SVG, AI, EPS।\n\nOpenGL মূলত Raster output দেয় — screen এ pixel fill করে।` },
        { name: "Coordinate Systems", explanation: `OpenGL এ বিভিন্ন coordinate space আছে:\n\n1. Object/Model Space: Object নিজের local coordinate\n2. World Space: Scene এর global coordinate\n3. Camera/View Space: Camera থেকে দেখা coordinate\n4. Clip Space: Projection এর পরে, -1 থেকে +1 range\n5. Screen Space: Actual pixel coordinate\n\nএই transformation pipeline কে Rendering Pipeline বলে।` },
        { name: "Color Models", explanation: `RGB: Red, Green, Blue — Light এর additive model। প্রতিটি 0-255 বা 0.0-1.0। OpenGL এ glColor3f(r, g, b) বা glColor4f(r, g, b, a) ব্যবহার হয়।\n\nHSV: Hue (রং), Saturation (তীব্রতা), Value (উজ্জ্বলতা)\n\nAlpha: Transparency value। 0.0 = সম্পূর্ণ transparent, 1.0 = সম্পূর্ণ opaque।` },
        { name: "Pixel, Resolution & Aspect Ratio", explanation: `Pixel: Picture Element। Screen এর সবচেয়ে ছোট unit।\n\nResolution: Width × Height pixels। যেমন: 1920×1080 (Full HD)।\n\nAspect Ratio: Width:Height এর অনুপাত। 16:9, 4:3 ইত্যাদি।\n\nOpenGL এ viewport এবং projection matrix দিয়ে এটি নিয়ন্ত্রণ করা হয়।` },
        { name: "Rendering Pipeline", explanation: `OpenGL Rendering Pipeline এর ধাপগুলো:\n\n1. Vertex Specification: Vertices define করা\n2. Vertex Processing: Vertex Shader চলে (Modern OpenGL)\n3. Primitive Assembly: Vertices থেকে triangles/lines তৈরি\n4. Rasterization: Primitives কে pixels এ convert\n5. Fragment Processing: প্রতিটি pixel এর color calculate\n6. Output Merging: Depth test, blending ইত্যাদি\n\nFixed Function Pipeline (Legacy/Classic OpenGL) এ glBegin/glEnd দিয়ে কাজ হতো।` },
        { name: "Frame Buffer", explanation: `Frame Buffer হলো memory যেখানে rendered image সংরক্ষিত হয়। বিভিন্ন buffers:\n\n• Color Buffer: Pixel এর RGB/RGBA color\n• Depth Buffer (Z-Buffer): প্রতিটি pixel এর depth value — 3D occlusion handle করে\n• Stencil Buffer: Masking এর জন্য\n• Accumulation Buffer: Motion blur, soft shadows এর জন্য\n\nDouble Buffering: Front buffer display করে, Back buffer এ নতুন frame render হয় — flicker কমায়।` },
      ]
    },
    {
      id: "cg2",
      title: "📦 Primitives & Drawing",
      topics: [
        { name: "Point, Line, Triangle", explanation: `OpenGL এ সব কিছু এই basic primitives দিয়ে তৈরি:\n\n• GL_POINTS: Individual points\n• GL_LINES: দুটো vertex = একটা line\n• GL_LINE_STRIP: Connected line segments\n• GL_LINE_LOOP: Closed line loop\n• GL_TRIANGLES: তিনটো vertex = একটা triangle\n• GL_TRIANGLE_STRIP: Shared edges সহ triangles\n• GL_TRIANGLE_FAN: একটা center থেকে fan আকৃতিতে\n• GL_QUADS: চারটো vertex = একটা quad (Legacy)\n• GL_POLYGON: Convex polygon (Legacy)` },
        { name: "Scan Line Algorithm", explanation: `2D polygon fill করার জন্য:\n\n1. Polygon এর edges খুঁজে বের করো\n2. প্রতিটি horizontal scan line এ edge intersections খুঁজো\n3. Intersection pairs এর মধ্যে pixels fill করো\n\nOpenGL এ এটি automatically rasterization stage এ হয়।` },
        { name: "Bresenham's Line Algorithm", explanation: `Integer arithmetic ব্যবহার করে efficient line drawing:\n\nFloat calculation ছাড়া, শুধু addition ও bit shift দিয়ে line draw করা যায়।\n\nএকই ভাবে Bresenham's Circle Algorithm আছে circle draw করার জন্য।\n\nOpenGL এ এগুলো internally ব্যবহার হয়। আমরা শুধু vertices দিই।` },
        { name: "Clipping", explanation: `Viewport এর বাইরের অংশ বাদ দেওয়া।\n\n• Cohen-Sutherland: Line clipping algorithm\n• Sutherland-Hodgman: Polygon clipping\n• OpenGL এ Clip Space এ automatically হয় (-1 to +1)` },
        { name: "Polygon Fill & Winding", explanation: `Winding Order: Triangle এর vertices কোন দিকে আছে তার উপর ভিত্তি করে front/back face determine হয়।\n\n• GL_CCW: Counter-Clockwise = Front face (default)\n• GL_CW: Clockwise = Front face\n\nBack Face Culling: পিছনের faces render না করে performance বাড়ানো।` },
      ]
    },
    {
      id: "cg3",
      title: "🔄 Transformations",
      topics: [
        { name: "Translation", explanation: `Object কে এক জায়গা থেকে অন্য জায়গায় সরানো।\nMatrix: [1,0,0,tx; 0,1,0,ty; 0,0,1,tz; 0,0,0,1]\nOpenGL: glTranslatef(tx, ty, tz)` },
        { name: "Rotation", explanation: `Object কে একটি axis এর চারপাশে ঘোরানো।\nOpenGL: glRotatef(angle, x, y, z)\nযেমন: glRotatef(45.0f, 0,0,1) → Z-axis এর চারপাশে 45° ঘোরাও` },
        { name: "Scaling", explanation: `Object এর size পরিবর্তন করা।\nOpenGL: glScalef(sx, sy, sz)\nUniform scaling: sx=sy=sz\nNon-uniform: আলাদা values` },
        { name: "Matrix Stack", explanation: `OpenGL এ Matrix Stack ব্যবহার করে hierarchical transformations করা যায়:\n\nglPushMatrix() → Current matrix stack এ push করো\n...transformations...\nglPopMatrix() → Stack থেকে pop করো (আগের matrix ফিরে আসে)\n\nএটা parent-child relationships এর জন্য দারুণ — যেমন রোবটের arm move করলে hand ও move করবে।` },
        { name: "Projection (Orthographic vs Perspective)", explanation: `Orthographic: Parallel projection। দূরত্ব বাড়লেও size পরিবর্তন হয় না। 2D/CAD এর জন্য।\nglOrtho(left, right, bottom, top, near, far)\n\nPerspective: দূরের object ছোট দেখায়। Real life এর মতো। 3D games এ ব্যবহার হয়।\ngluPerspective(fovy, aspect, near, far)` },
        { name: "Viewport Transformation", explanation: `Clip space (-1 to +1) থেকে screen pixels এ convert।\n\nglViewport(x, y, width, height)\n\nসাধারণত window resize callback এ call করা হয়।` },
      ]
    },
    {
      id: "cg4",
      title: "💡 Lighting & Shading",
      topics: [
        { name: "Light Types", explanation: `1. Ambient Light: সব দিক থেকে সমান আলো। Shadow নেই।\n2. Diffuse Light: Directional light যা surface normal এর উপর নির্ভর করে।\n3. Specular Light: Shininess/highlight তৈরি করে।\n4. Positional Light: নির্দিষ্ট position থেকে আলো (w=1.0)\n5. Directional Light: দূর থেকে parallel আলো (w=0.0)\n6. Spotlight: Cone আকৃতিতে আলো।` },
        { name: "Phong Illumination Model", explanation: `Phong Model = Ambient + Diffuse + Specular\n\nAmbient: Ka × Ia\nDiffuse: Kd × Id × (N·L) — N=surface normal, L=light direction\nSpecular: Ks × Is × (R·V)^n — R=reflection, V=view direction, n=shininess\n\nOpenGL এ glMaterialfv() দিয়ে material properties set করা হয়।` },
        { name: "Flat vs Smooth Shading", explanation: `Flat Shading: পুরো polygon এ একটা color। Fast কিন্তু faceted দেখায়। glShadeModel(GL_FLAT)\n\nGouraud Shading: Vertices এ color calculate করে, মধ্যে interpolate করে। Smoother। glShadeModel(GL_SMOOTH) — default\n\nPhong Shading: প্রতিটি pixel এ normal interpolate করে calculation। Most realistic। Modern OpenGL এ fragment shader এ করতে হয়।` },
        { name: "Normal Vectors", explanation: `Normal vector হলো surface এর perpendicular direction।\n\nLighting calculation এর জন্য প্রতিটি vertex এ normal থাকতে হয়।\n\nglNormal3f(nx, ny, nz) দিয়ে vertex normal দেওয়া হয়।\n\nGL_NORMALIZE enable করলে OpenGL automatically normalize করে।\nglEnable(GL_NORMALIZE)` },
      ]
    },
    {
      id: "cg5",
      title: "🖼️ Texturing",
      topics: [
        { name: "Texture Mapping Basics", explanation: `Texture হলো image যা 3D surface এ "wrap" করা হয়।\n\nTexture Coordinates (UV/ST): (0,0) থেকে (1,1) পর্যন্ত।\nglTexCoord2f(s, t) দিয়ে vertex এ texture coordinate দেওয়া হয়।` },
        { name: "Texture Wrapping Modes", explanation: `Texture coordinate 0-1 এর বাইরে গেলে কী হবে:\n\n• GL_REPEAT: Texture repeat হবে (tile)\n• GL_CLAMP: Edge color extend হবে\n• GL_CLAMP_TO_EDGE: Edge pixel repeat হবে\n• GL_MIRRORED_REPEAT: Mirror করে repeat\n\nglTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT)` },
        { name: "Texture Filtering", explanation: `Texture zoom in/out এ কীভাবে pixels sample হবে:\n\n• GL_NEAREST: Nearest pixel — pixelated কিন্তু fast\n• GL_LINEAR: Bilinear interpolation — smooth\n• GL_LINEAR_MIPMAP_LINEAR: Best quality (Trilinear)\n\nMipmap: বিভিন্ন size এর texture pre-calculated — দূরের objects এর জন্য ছোট texture ব্যবহার।` },
      ]
    },
    {
      id: "cg6",
      title: "🎬 Animation",
      topics: [
        { name: "Animation Basics", explanation: `Animation হলো সময়ের সাথে state পরিবর্তন।\n\nFPS (Frames Per Second): প্রতি সেকেন্ডে কতগুলো frame render হয়।\n24fps = Cinema, 30fps = TV, 60fps = Smooth gaming\n\nGLUT এ glutTimerFunc() বা glutIdleFunc() দিয়ে animation করা হয়।` },
        { name: "Double Buffering", explanation: `Single buffer: Render করতে করতে screen এ দেখা যায় → flicker\nDouble buffer: Back buffer এ render, তারপর swap → smooth\n\nGLUT setup: glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB)\nFrame শেষে: glutSwapBuffers() call করতে হয়।` },
        { name: "Timer & Idle Animation", explanation: `glutIdleFunc(myIdle): CPU ফাঁকা থাকলেই call হয় — CPU 100% use করে\nglutTimerFunc(ms, myTimer, value): নির্দিষ্ট milliseconds পরে একবার call হয়\n\nTimer Animation (recommended):\nvoid timer(int val) {\n  angle += 1.0f;\n  glutPostRedisplay();\n  glutTimerFunc(16, timer, 0); // ~60fps\n}` },
      ]
    },
  ],

  categories: [
    {
      id: "init",
      emoji: "🚀",
      title: "GLUT / FreeGLUT — Initialization Functions",
      description: "Program শুরুতে GLUT initialize এবং setup করার functions",
      functions: [
        {
          name: "glutInit(int *argc, char **argv)",
          signature: "void glutInit(int *argc, char **argv)",
          params: "argc: main() এর argument count pointer, argv: argument array",
          returns: "void",
          explanation: `GLUT library initialize করার প্রথম এবং সবচেয়ে গুরুত্বপূর্ণ function। main() এর প্রথম line এ call করতে হয়। এটি GLUT এর internal state setup করে এবং command-line arguments process করে।`,
          example: `int main(int argc, char **argv) {
    glutInit(&argc, argv);  // MUST be first
    // ... rest of setup
}`,
          note: "FreeGLUT এ এটি একটু বেশি flexible। Mac/Linux/Windows সব জায়গায় কাজ করে।"
        },
        {
          name: "glutInitDisplayMode(unsigned int mode)",
          signature: "void glutInitDisplayMode(unsigned int mode)",
          params: "mode: Bitwise OR করা display mode flags",
          returns: "void",
          explanation: `Window এর display properties set করে। কোন ধরনের buffer এবং color mode চাই তা specify করে।`,
          example: `// Most common setup:
glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);

// With stencil buffer:
glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA | GLUT_DEPTH | GLUT_STENCIL);`,
          flags: [
            "GLUT_SINGLE — Single buffering (flicker হতে পারে)",
            "GLUT_DOUBLE — Double buffering (smooth animation)",
            "GLUT_RGB — RGB color (no alpha)",
            "GLUT_RGBA — RGBA color (with alpha/transparency)",
            "GLUT_DEPTH — Depth buffer (3D occlusion)",
            "GLUT_STENCIL — Stencil buffer (masking)",
            "GLUT_ACCUM — Accumulation buffer (motion blur)",
            "GLUT_ALPHA — Alpha buffer",
            "GLUT_STEREO — Stereo rendering (VR-style)",
            "GLUT_MULTISAMPLE — Anti-aliasing (MSAA)",
          ]
        },
        {
          name: "glutInitWindowSize(int width, int height)",
          signature: "void glutInitWindowSize(int width, int height)",
          params: "width: window এর pixel width, height: window এর pixel height",
          returns: "void",
          explanation: `Window create করার আগে তার initial size set করে। Pixels এ measure করা হয়।`,
          example: `glutInitWindowSize(800, 600);   // 800x600 window
glutInitWindowSize(1280, 720);  // HD window`,
          note: "Window create হওয়ার পরেও glutReshapeWindow() দিয়ে size পরিবর্তন করা যায়।"
        },
        {
          name: "glutInitWindowPosition(int x, int y)",
          signature: "void glutInitWindowPosition(int x, int y)",
          params: "x: screen এর left থেকে pixel distance, y: screen এর top থেকে pixel distance",
          returns: "void",
          explanation: `Window কোথায় appear করবে তা set করে। Screen এর top-left corner হলো (0,0)।`,
          example: `glutInitWindowPosition(100, 100);  // Screen এর 100,100 position এ
glutInitWindowPosition(-1, -1);   // OS decide করবে (center ইত্যাদি)`,
        },
        {
          name: "glutCreateWindow(const char *title)",
          signature: "int glutCreateWindow(const char *title)",
          params: "title: Window এর title bar এ দেখাবে যে string",
          returns: "int: Window ID (1 থেকে শুরু)",
          explanation: `Actual OpenGL window তৈরি করে। এই function call এর পরে window screen এ দেখা যায়। Return করা window ID দিয়ে পরে এই window কে identify করা যায়। Multiple windows থাকলে এই ID দিয়ে active window switch করা যায়।`,
          example: `int winID = glutCreateWindow("My OpenGL App");
printf("Window ID: %d\\n", winID);`,
          note: "FreeGLUT এ Unicode title support আছে। glutSetWindowTitle() দিয়ে পরে title পরিবর্তন করা যায়।"
        },
        {
          name: "glutInitContextVersion(int major, int minor)",
          signature: "void glutInitContextVersion(int major, int minor)",
          params: "major: OpenGL major version, minor: minor version",
          returns: "void",
          explanation: `কোন version এর OpenGL context চাই তা specify করে। FreeGLUT specific।`,
          example: `glutInitContextVersion(3, 3);  // OpenGL 3.3
glutInitContextVersion(4, 5);  // OpenGL 4.5`,
          note: "Modern OpenGL (3.3+) ব্যবহার করতে চাইলে এই function দরকার।"
        },
        {
          name: "glutInitContextProfile(int profile)",
          signature: "void glutInitContextProfile(int profile)",
          params: "profile: GLUT_CORE_PROFILE বা GLUT_COMPATIBILITY_PROFILE",
          returns: "void",
          explanation: `OpenGL context profile select করে।\n\n• GLUT_CORE_PROFILE: Modern OpenGL, deprecated features নেই\n• GLUT_COMPATIBILITY_PROFILE: Legacy features সহ (glBegin/glEnd কাজ করে)`,
          example: `glutInitContextProfile(GLUT_CORE_PROFILE);
// অথবা
glutInitContextProfile(GLUT_COMPATIBILITY_PROFILE);`,
        },
        {
          name: "glutInitContextFlags(int flags)",
          signature: "void glutInitContextFlags(int flags)",
          params: "flags: GLUT_DEBUG এবং/অথবা GLUT_FORWARD_COMPATIBLE",
          returns: "void",
          explanation: `Context creation flags set করে।\n\n• GLUT_DEBUG: Debug context, extra error checking\n• GLUT_FORWARD_COMPATIBLE: Future versions compatible`,
          example: `glutInitContextFlags(GLUT_DEBUG | GLUT_FORWARD_COMPATIBLE);`,
        },
      ]
    },
    {
      id: "mainloop",
      emoji: "🔁",
      title: "GLUT — Main Loop & Event Handling",
      description: "Program এর main event loop চালানোর functions",
      functions: [
        {
          name: "glutMainLoop()",
          signature: "void glutMainLoop()",
          params: "কোনো parameter নেই",
          returns: "void (never returns in original GLUT)",
          explanation: `GLUT এর event processing loop শুরু করে। এই function call করার পরে program GLUT এর control এ চলে যায়। Keyboard, mouse, window resize ইত্যাদি events process হতে থাকে এবং registered callback functions call হয়।\n\nOriginal GLUT এ এটি কখনো return করে না। FreeGLUT এ glutLeaveMainLoop() দিয়ে বের হওয়া যায়।`,
          example: `// সব setup শেষে এই line call করো:
glutMainLoop();
// এর নিচের কোনো code চলবে না (original GLUT এ)`,
        },
        {
          name: "glutMainLoopEvent() [FreeGLUT]",
          signature: "void glutMainLoopEvent()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `FreeGLUT specific। Single iteration of the event loop চালায়। নিজের main loop লিখতে চাইলে ব্যবহার করা যায়। Game engine বা custom loop এর জন্য দরকারি।`,
          example: `while(running) {
    glutMainLoopEvent();  // Process one frame's events
    myCustomUpdate();
    myCustomRender();
}`,
        },
        {
          name: "glutLeaveMainLoop() [FreeGLUT]",
          signature: "void glutLeaveMainLoop()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `FreeGLUT specific। Main loop থেকে cleanly বের হওয়ার signal দেয়। glutMainLoop() return করবে। Original GLUT এ exit() call করতে হতো।`,
          example: `void keyboard(unsigned char key, int x, int y) {
    if(key == 27) {  // ESC key
        glutLeaveMainLoop();
    }
}`,
        },
        {
          name: "glutPostRedisplay()",
          signature: "void glutPostRedisplay()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Current window কে redraw করার request পাঠায়। Display callback কে "dirty" mark করে। GLUT পরবর্তী সুযোগে display callback call করবে। Animation loop এ এটি অত্যন্ত গুরুত্বপূর্ণ।`,
          example: `void timer(int val) {
    angle += 2.0f;
    glutPostRedisplay();  // "আমাকে আবার draw করো"
    glutTimerFunc(16, timer, 0);
}`,
          note: "প্রতিটি callback এর শেষে এটি call করলে continuous animation হয়।"
        },
        {
          name: "glutPostWindowRedisplay(int win)",
          signature: "void glutPostWindowRedisplay(int win)",
          params: "win: Window ID",
          returns: "void",
          explanation: `Specific window কে redraw করার request। Multiple windows থাকলে নির্দিষ্ট window refresh করতে ব্যবহার।`,
          example: `glutPostWindowRedisplay(secondWindowID);`,
        },
        {
          name: "glutSwapBuffers()",
          signature: "void glutSwapBuffers()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Double buffering mode এ front এবং back buffer swap করে। Back buffer এ render করা frame এখন display হবে। Display callback এর শেষে এটি call করতে হয় (GLUT_DOUBLE mode এ)।`,
          example: `void display() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    // ... drawing code ...
    glutSwapBuffers();  // Show the rendered frame
}`,
          note: "GLUT_SINGLE mode এ glFlush() ব্যবহার করতে হয়।"
        },
      ]
    },
    {
      id: "callbacks",
      emoji: "📞",
      title: "GLUT — Callback Registration Functions",
      description: "Events হলে কোন function call হবে তা register করার functions",
      functions: [
        {
          name: "glutDisplayFunc(void (*func)(void))",
          signature: "void glutDisplayFunc(void (*func)(void))",
          params: "func: কোনো parameter নেই এবং void return করে এমন function এর pointer",
          returns: "void",
          explanation: `Window এ drawing করার callback register করে। Window dirty হলে (resize, expose, glutPostRedisplay) এই callback call হয়। সব rendering code এখানে থাকে। এটি সবচেয়ে গুরুত্বপূর্ণ callback।`,
          example: `void myDisplay() {
    glClear(GL_COLOR_BUFFER_BIT);
    // Draw everything here
    glBegin(GL_TRIANGLES);
        glVertex2f(0, 0.5f);
        glVertex2f(-0.5f, -0.5f);
        glVertex2f(0.5f, -0.5f);
    glEnd();
    glutSwapBuffers();
}

// Register করো:
glutDisplayFunc(myDisplay);`,
        },
        {
          name: "glutReshapeFunc(void (*func)(int width, int height))",
          signature: "void glutReshapeFunc(void (*func)(int w, int h))",
          params: "func: নতুন width এবং height পাবে",
          returns: "void",
          explanation: `Window resize হলে এই callback call হয়। Viewport এবং projection matrix update করার জন্য ব্যবহার। Window create হওয়ার সময়ও একবার call হয়।`,
          example: `void myReshape(int w, int h) {
    glViewport(0, 0, w, h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(45.0, (double)w/h, 0.1, 100.0);
    glMatrixMode(GL_MODELVIEW);
}

glutReshapeFunc(myReshape);`,
        },
        {
          name: "glutKeyboardFunc(void (*func)(unsigned char key, int x, int y))",
          signature: "void glutKeyboardFunc(void (*func)(unsigned char, int, int))",
          params: "key: ASCII character, x/y: mouse position",
          returns: "void",
          explanation: `Regular keyboard keys press হলে call হয়। ASCII characters handle করে (a-z, A-Z, 0-9, space, enter ইত্যাদি)। Special keys (arrows, F1-F12) এর জন্য glutSpecialFunc() দরকার।`,
          example: `void myKeyboard(unsigned char key, int x, int y) {
    switch(key) {
        case 'q': case 'Q': case 27:  // ESC
            exit(0);
            break;
        case 'r':
            rotateAngle += 5.0f;
            glutPostRedisplay();
            break;
        case ' ':
            // Toggle something
            break;
    }
}

glutKeyboardFunc(myKeyboard);`,
        },
        {
          name: "glutKeyboardUpFunc(void (*func)(unsigned char key, int x, int y))",
          signature: "void glutKeyboardUpFunc(void (*func)(unsigned char, int, int))",
          params: "key: released key, x/y: mouse position",
          returns: "void",
          explanation: `Keyboard key release হলে call হয়। Key এর up event। Game এ continuous movement এর জন্য key held state track করতে ব্যবহার।`,
          example: `bool keyState[256] = {false};

void keyDown(unsigned char k, int x, int y) { keyState[k] = true; }
void keyUp(unsigned char k, int x, int y) { keyState[k] = false; }

// তারপর idle/timer এ:
if(keyState['w']) moveForward();`,
        },
        {
          name: "glutSpecialFunc(void (*func)(int key, int x, int y))",
          signature: "void glutSpecialFunc(void (*func)(int, int, int))",
          params: "key: GLUT_KEY_* constant, x/y: mouse position",
          returns: "void",
          explanation: `Special/function keys press হলে call হয়। Arrow keys, F1-F12, Home, End, Page Up/Down, Insert এর জন্য।`,
          example: `void mySpecial(int key, int x, int y) {
    switch(key) {
        case GLUT_KEY_UP:    cameraY += 0.1f; break;
        case GLUT_KEY_DOWN:  cameraY -= 0.1f; break;
        case GLUT_KEY_LEFT:  cameraX -= 0.1f; break;
        case GLUT_KEY_RIGHT: cameraX += 0.1f; break;
        case GLUT_KEY_F1:    // Help screen; break;
    }
    glutPostRedisplay();
}

glutSpecialFunc(mySpecial);`,
          keys: [
            "GLUT_KEY_F1 to GLUT_KEY_F12",
            "GLUT_KEY_LEFT, GLUT_KEY_RIGHT, GLUT_KEY_UP, GLUT_KEY_DOWN",
            "GLUT_KEY_PAGE_UP, GLUT_KEY_PAGE_DOWN",
            "GLUT_KEY_HOME, GLUT_KEY_END",
            "GLUT_KEY_INSERT"
          ]
        },
        {
          name: "glutSpecialUpFunc(void (*func)(int key, int x, int y))",
          signature: "void glutSpecialUpFunc(void (*func)(int, int, int))",
          params: "key: released special key",
          returns: "void",
          explanation: `Special key release callback। glutKeyboardUpFunc এর special key equivalent।`,
          example: `glutSpecialUpFunc(mySpecialUp);`,
        },
        {
          name: "glutMouseFunc(void (*func)(int button, int state, int x, int y))",
          signature: "void glutMouseFunc(void (*func)(int, int, int, int))",
          params: "button: GLUT_LEFT/MIDDLE/RIGHT_BUTTON, state: GLUT_UP/GLUT_DOWN, x/y: position",
          returns: "void",
          explanation: `Mouse button click/release হলে call হয়।`,
          example: `void myMouse(int button, int state, int x, int y) {
    if(button == GLUT_LEFT_BUTTON && state == GLUT_DOWN) {
        printf("Left click at %d, %d\\n", x, y);
    }
    if(button == GLUT_RIGHT_BUTTON && state == GLUT_DOWN) {
        // Context menu বা কিছু
    }
    // Scroll wheel:
    if(button == 3) zoom += 0.1f;  // Scroll up
    if(button == 4) zoom -= 0.1f;  // Scroll down
}

glutMouseFunc(myMouse);`,
          note: "Mouse scroll wheel হলো button 3 (up) এবং 4 (down) অনেক platform এ।"
        },
        {
          name: "glutMotionFunc(void (*func)(int x, int y))",
          signature: "void glutMotionFunc(void (*func)(int x, int y))",
          params: "x, y: Current mouse position",
          returns: "void",
          explanation: `Mouse button চেপে ধরে move করলে (drag) call হয়। Camera rotation বা object dragging এর জন্য।`,
          example: `int lastX = 0, lastY = 0;
void myMotion(int x, int y) {
    int dx = x - lastX, dy = y - lastY;
    cameraAngleX += dy * 0.5f;
    cameraAngleY += dx * 0.5f;
    lastX = x; lastY = y;
    glutPostRedisplay();
}
glutMotionFunc(myMotion);`,
        },
        {
          name: "glutPassiveMotionFunc(void (*func)(int x, int y))",
          signature: "void glutPassiveMotionFunc(void (*func)(int x, int y))",
          params: "x, y: Current mouse position",
          returns: "void",
          explanation: `Mouse button না চেপে শুধু move করলে call হয়। Hover effects বা cursor position tracking এর জন্য।`,
          example: `void myPassiveMotion(int x, int y) {
    mouseX = x;
    mouseY = y;
    // Highlight objects under cursor
}
glutPassiveMotionFunc(myPassiveMotion);`,
        },
        {
          name: "glutIdleFunc(void (*func)(void))",
          signature: "void glutIdleFunc(void (*func)(void))",
          params: "func: কোনো parameter নেই এমন function",
          returns: "void",
          explanation: `CPU idle থাকলে (কোনো event নেই) এই function বারবার call হয়। Continuous animation এর জন্য ব্যবহার হয়। কিন্তু CPU 100% consume করে। glutTimerFunc() বেশি efficient।`,
          example: `void myIdle() {
    angle += 0.5f;
    glutPostRedisplay();
}
glutIdleFunc(myIdle);

// Disable করতে:
glutIdleFunc(NULL);`,
          note: "Multiple windows থাকলে সব window এর জন্য call হয়।"
        },
        {
          name: "glutTimerFunc(unsigned int msec, void (*func)(int value), int value)",
          signature: "void glutTimerFunc(unsigned int msecs, void (*func)(int), int value)",
          params: "msec: milliseconds delay, func: callback function, value: callback এ pass হবে",
          returns: "void",
          explanation: `নির্দিষ্ট milliseconds পরে একবার callback call করে। প্রতিবার manually re-register করতে হয়। Controlled animation এর সবচেয়ে ভালো পদ্ধতি।`,
          example: `void myTimer(int value) {
    angle += 2.0f;
    if(angle > 360) angle -= 360;
    glutPostRedisplay();
    glutTimerFunc(16, myTimer, 0);  // ~60 FPS
}

// First call:
glutTimerFunc(16, myTimer, 0);`,
          note: "16ms ≈ 60fps, 33ms ≈ 30fps। value parameter দিয়ে আলাদা timer identify করা যায়।"
        },
        {
          name: "glutEntryFunc(void (*func)(int state))",
          signature: "void glutEntryFunc(void (*func)(int state))",
          params: "state: GLUT_ENTERED বা GLUT_LEFT",
          returns: "void",
          explanation: `Mouse window এ enter বা leave করলে call হয়।`,
          example: `void myEntry(int state) {
    if(state == GLUT_ENTERED) printf("Mouse entered\\n");
    else printf("Mouse left\\n");
}
glutEntryFunc(myEntry);`,
        },
        {
          name: "glutVisibilityFunc(void (*func)(int state))",
          signature: "void glutVisibilityFunc(void (*func)(int state))",
          params: "state: GLUT_VISIBLE বা GLUT_NOT_VISIBLE",
          returns: "void",
          explanation: `Window visible/hidden হলে call হয়। Minimize করলে animation pause করতে পারো।`,
          example: `void myVisibility(int state) {
    if(state == GLUT_VISIBLE) glutIdleFunc(myIdle);
    else glutIdleFunc(NULL);  // Pause when hidden
}
glutVisibilityFunc(myVisibility);`,
        },
        {
          name: "glutWindowStatusFunc(void (*func)(int state)) [FreeGLUT]",
          signature: "void glutWindowStatusFunc(void (*func)(int state))",
          params: "state: GLUT_HIDDEN, GLUT_FULLY_RETAINED, GLUT_PARTIALLY_RETAINED, GLUT_FULLY_COVERED",
          returns: "void",
          explanation: `Window এর visibility/occlusion status change হলে call হয়। glutVisibilityFunc এর আরও detailed version।`,
          example: `glutWindowStatusFunc(myWindowStatus);`,
        },
        {
          name: "glutCloseFunc(void (*func)(void)) [FreeGLUT]",
          signature: "void glutCloseFunc(void (*func)(void))",
          params: "func: cleanup callback",
          returns: "void",
          explanation: `Window close করার সময় call হয়। Cleanup code এখানে রাখা যায়। FreeGLUT specific।`,
          example: `void cleanup() {
    printf("Cleaning up...\\n");
    // Free textures, VBOs, etc.
}
glutCloseFunc(cleanup);`,
        },
      ]
    },
    {
      id: "window",
      emoji: "🪟",
      title: "GLUT — Window Management Functions",
      description: "Window তৈরি, পরিবর্তন এবং control করার functions",
      functions: [
        {
          name: "glutCreateSubWindow(int win, int x, int y, int w, int h)",
          signature: "int glutCreateSubWindow(int win, int x, int y, int width, int height)",
          params: "win: parent window ID, x/y: position relative to parent, w/h: size",
          returns: "int: Sub-window ID",
          explanation: `Parent window এর ভেতরে একটি sub-window তৈরি করে। প্রতিটি sub-window এর আলাদা OpenGL context এবং callbacks থাকে। GUI panels বা split-view এর জন্য ব্যবহার।`,
          example: `int mainWin = glutCreateWindow("Main");
int subWin = glutCreateSubWindow(mainWin, 10, 10, 200, 150);
// Sub-window এর জন্য আলাদা callbacks register করো`,
        },
        {
          name: "glutDestroyWindow(int win)",
          signature: "void glutDestroyWindow(int win)",
          params: "win: destroy করার window ID",
          returns: "void",
          explanation: `Window destroy করে। Child sub-windows ও destroy হয়।`,
          example: `glutDestroyWindow(subWindowID);`,
        },
        {
          name: "glutSetWindow(int win)",
          signature: "void glutSetWindow(int win)",
          params: "win: active করার window ID",
          returns: "void",
          explanation: `Current active window set করে। Multiple windows এ, কোন window এ operation করতে চাই তা select করার জন্য।`,
          example: `glutSetWindow(secondWindowID);
glutPostRedisplay();  // Second window কে redisplay করো`,
        },
        {
          name: "glutGetWindow()",
          signature: "int glutGetWindow()",
          params: "কোনো parameter নেই",
          returns: "int: Current window ID",
          explanation: `Currently active window এর ID return করে।`,
          example: `int currentWin = glutGetWindow();
printf("Current window: %d\\n", currentWin);`,
        },
        {
          name: "glutSetWindowTitle(const char *title)",
          signature: "void glutSetWindowTitle(const char *title)",
          params: "title: নতুন title string",
          returns: "void",
          explanation: `Current window এর title bar text পরিবর্তন করে। Dynamic title update এর জন্য ব্যবহার।`,
          example: `char title[50];
sprintf(title, "FPS: %.1f", fps);
glutSetWindowTitle(title);`,
        },
        {
          name: "glutSetIconTitle(const char *title)",
          signature: "void glutSetIconTitle(const char *title)",
          params: "title: Taskbar/icon এ দেখানো title",
          returns: "void",
          explanation: `Window minimize করলে যে title দেখায় তা set করে।`,
          example: `glutSetIconTitle("My App");`,
        },
        {
          name: "glutReshapeWindow(int width, int height)",
          signature: "void glutReshapeWindow(int width, int height)",
          params: "width, height: নতুন window size",
          returns: "void",
          explanation: `Programmatically window এর size পরিবর্তন করে।`,
          example: `glutReshapeWindow(1280, 720);`,
        },
        {
          name: "glutPositionWindow(int x, int y)",
          signature: "void glutPositionWindow(int x, int y)",
          params: "x, y: Screen coordinate",
          returns: "void",
          explanation: `Window এর position পরিবর্তন করে।`,
          example: `glutPositionWindow(0, 0);  // Screen এর top-left এ`,
        },
        {
          name: "glutShowWindow()",
          signature: "void glutShowWindow()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Hidden window কে show করে।`,
          example: `glutShowWindow();`,
        },
        {
          name: "glutHideWindow()",
          signature: "void glutHideWindow()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Window কে hide করে।`,
          example: `glutHideWindow();`,
        },
        {
          name: "glutIconifyWindow()",
          signature: "void glutIconifyWindow()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Window কে minimize/iconify করে।`,
          example: `glutIconifyWindow();`,
        },
        {
          name: "glutFullScreen()",
          signature: "void glutFullScreen()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Window কে full screen করে। Resolution পরিবর্তন হয় না।`,
          example: `glutFullScreen();`,
        },
        {
          name: "glutLeaveFullScreen() [FreeGLUT]",
          signature: "void glutLeaveFullScreen()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Full screen mode থেকে বের হয়ে windowed mode এ ফিরে আসে।`,
          example: `void keyboard(unsigned char key, int x, int y) {
    if(key == 'f') glutFullScreen();
    if(key == 'w') glutLeaveFullScreen();
}`,
        },
        {
          name: "glutFullScreenToggle() [FreeGLUT]",
          signature: "void glutFullScreenToggle()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Full screen ↔ Windowed mode toggle করে।`,
          example: `if(key == 'f') glutFullScreenToggle();`,
        },
        {
          name: "glutPopWindow()",
          signature: "void glutPopWindow()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Window কে সব windows এর সামনে আনে (z-order)।`,
          example: `glutPopWindow();`,
        },
        {
          name: "glutPushWindow()",
          signature: "void glutPushWindow()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Window কে সব windows এর পেছনে পাঠায়।`,
          example: `glutPushWindow();`,
        },
      ]
    },
    {
      id: "menu",
      emoji: "📋",
      title: "GLUT — Menu Functions",
      description: "Right-click context menu তৈরি ও manage করার functions",
      functions: [
        {
          name: "glutCreateMenu(void (*func)(int value))",
          signature: "int glutCreateMenu(void (*func)(int value))",
          params: "func: menu item select হলে call হবে, value পাবে",
          returns: "int: Menu ID",
          explanation: `একটি popup menu তৈরি করে। Return করা menu ID দিয়ে এতে items add করা যায়।`,
          example: `void menuCallback(int value) {
    switch(value) {
        case 1: drawTriangle(); break;
        case 2: drawCircle(); break;
        case 3: exit(0); break;
    }
}

int menuID = glutCreateMenu(menuCallback);
glutAddMenuEntry("Triangle", 1);
glutAddMenuEntry("Circle", 2);
glutAddMenuEntry("Exit", 3);
glutAttachMenu(GLUT_RIGHT_BUTTON);`,
        },
        {
          name: "glutAddMenuEntry(const char *label, int value)",
          signature: "void glutAddMenuEntry(const char *label, int value)",
          params: "label: দেখানো text, value: callback এ যাবে",
          returns: "void",
          explanation: `Current menu এ একটি entry (item) যোগ করে।`,
          example: `glutAddMenuEntry("Draw Circle", 1);
glutAddMenuEntry("Clear Screen", 2);
glutAddMenuEntry("Quit", 0);`,
        },
        {
          name: "glutAddSubMenu(const char *label, int submenu)",
          signature: "void glutAddSubMenu(const char *label, int submenu)",
          params: "label: submenu এর label, submenu: sub-menu ID",
          returns: "void",
          explanation: `Current menu এ একটি sub-menu যোগ করে। Nested menus তৈরি করা যায়।`,
          example: `int colorMenu = glutCreateMenu(colorCallback);
glutAddMenuEntry("Red", 1);
glutAddMenuEntry("Green", 2);
glutAddMenuEntry("Blue", 3);

int mainMenu = glutCreateMenu(mainCallback);
glutAddSubMenu("Color", colorMenu);  // Sub-menu যোগ`,
        },
        {
          name: "glutAttachMenu(int button)",
          signature: "void glutAttachMenu(int button)",
          params: "button: GLUT_LEFT_BUTTON, GLUT_MIDDLE_BUTTON, বা GLUT_RIGHT_BUTTON",
          returns: "void",
          explanation: `Menu কে mouse button এ attach করে। সেই button press করলে menu দেখাবে।`,
          example: `glutAttachMenu(GLUT_RIGHT_BUTTON);  // Right-click menu`,
        },
        {
          name: "glutDetachMenu(int button)",
          signature: "void glutDetachMenu(int button)",
          params: "button: detach করার mouse button",
          returns: "void",
          explanation: `Mouse button থেকে menu detach করে।`,
          example: `glutDetachMenu(GLUT_RIGHT_BUTTON);`,
        },
        {
          name: "glutDestroyMenu(int menu)",
          signature: "void glutDestroyMenu(int menu)",
          params: "menu: destroy করার menu ID",
          returns: "void",
          explanation: `Menu destroy করে।`,
          example: `glutDestroyMenu(menuID);`,
        },
        {
          name: "glutChangeToMenuEntry(int item, const char *label, int value)",
          signature: "void glutChangeToMenuEntry(int item, const char *label, int value)",
          params: "item: 1-based index, label: নতুন label, value: নতুন value",
          returns: "void",
          explanation: `Existing menu entry পরিবর্তন করে।`,
          example: `glutChangeToMenuEntry(1, "New Label", 5);`,
        },
        {
          name: "glutRemoveMenuItem(int item)",
          signature: "void glutRemoveMenuItem(int item)",
          params: "item: 1-based index of item to remove",
          returns: "void",
          explanation: `Menu থেকে একটি item সরিয়ে দেয়।`,
          example: `glutRemoveMenuItem(2);  // 2nd item সরাও`,
        },
        {
          name: "glutSetMenu(int menu)",
          signature: "void glutSetMenu(int menu)",
          params: "menu: active করার menu ID",
          returns: "void",
          explanation: `Current menu set করে। Menu operations কোন menu এ হবে তা select।`,
          example: `glutSetMenu(colorMenuID);
glutAddMenuEntry("Yellow", 4);`,
        },
        {
          name: "glutGetMenu()",
          signature: "int glutGetMenu()",
          params: "কোনো parameter নেই",
          returns: "int: Current menu ID",
          explanation: `Currently active menu এর ID return করে।`,
          example: `int current = glutGetMenu();`,
        },
      ]
    },
    {
      id: "overlay",
      emoji: "🔲",
      title: "GLUT — Overlay Functions",
      description: "Hardware overlay plane manage করার functions (বিরল hardware এ)",
      functions: [
        { name: "glutEstablishOverlay()", signature: "void glutEstablishOverlay()", params: "none", returns: "void", explanation: `Window এর জন্য overlay plane তৈরি করে। Hardware overlay support করলে কাজ করে।`, example: `glutEstablishOverlay();` },
        { name: "glutRemoveOverlay()", signature: "void glutRemoveOverlay()", params: "none", returns: "void", explanation: `Overlay plane সরিয়ে দেয়।`, example: `glutRemoveOverlay();` },
        { name: "glutUseLayer(GLenum layer)", signature: "void glutUseLayer(GLenum layer)", params: "layer: GLUT_NORMAL বা GLUT_OVERLAY", returns: "void", explanation: `কোন layer এ draw করবে তা set করে।`, example: `glutUseLayer(GLUT_OVERLAY);` },
        { name: "glutPostOverlayRedisplay()", signature: "void glutPostOverlayRedisplay()", params: "none", returns: "void", explanation: `Overlay layer redisplay করার request।`, example: `glutPostOverlayRedisplay();` },
        { name: "glutShowOverlay()", signature: "void glutShowOverlay()", params: "none", returns: "void", explanation: `Overlay visible করে।`, example: `glutShowOverlay();` },
        { name: "glutHideOverlay()", signature: "void glutHideOverlay()", params: "none", returns: "void", explanation: `Overlay hide করে।`, example: `glutHideOverlay();` },
        { name: "glutOverlayDisplayFunc(void (*func)(void))", signature: "void glutOverlayDisplayFunc(void (*func)(void))", params: "func: display callback", returns: "void", explanation: `Overlay layer এর display callback।`, example: `glutOverlayDisplayFunc(drawOverlay);` },
        { name: "glutLayerGet(GLenum info)", signature: "int glutLayerGet(GLenum info)", params: "info: layer information constant", returns: "int", explanation: `Layer এর information query করে।`, example: `int hasOverlay = glutLayerGet(GLUT_HAS_OVERLAY);` },
      ]
    },
    {
      id: "fonts",
      emoji: "🔤",
      title: "GLUT — Font / Text Rendering",
      description: "Screen এ text render করার functions",
      functions: [
        {
          name: "glutBitmapCharacter(void *font, int character)",
          signature: "void glutBitmapCharacter(void *font, int character)",
          params: "font: Font constant, character: ASCII character code",
          returns: "void",
          explanation: `Bitmap font ব্যবহার করে screen এ একটি character render করে। Current raster position এ render হয়। glRasterPos2f() দিয়ে position set করতে হয়।`,
          example: `// একটি string render করার function:
void drawText(float x, float y, const char *text) {
    glRasterPos2f(x, y);
    while(*text) {
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_18, *text++);
    }
}

drawText(-0.5f, 0.5f, "Hello OpenGL!");`,
          fonts: [
            "GLUT_BITMAP_8_BY_13 — 8×13 fixed width",
            "GLUT_BITMAP_9_BY_15 — 9×15 fixed width",
            "GLUT_BITMAP_TIMES_ROMAN_10 — Times Roman 10pt",
            "GLUT_BITMAP_TIMES_ROMAN_24 — Times Roman 24pt",
            "GLUT_BITMAP_HELVETICA_10 — Helvetica 10pt",
            "GLUT_BITMAP_HELVETICA_12 — Helvetica 12pt",
            "GLUT_BITMAP_HELVETICA_18 — Helvetica 18pt (popular)"
          ]
        },
        {
          name: "glutBitmapString(void *font, const unsigned char *string) [FreeGLUT]",
          signature: "void glutBitmapString(void *font, const unsigned char *string)",
          params: "font: Font constant, string: null-terminated string",
          returns: "void",
          explanation: `পুরো string একসাথে render করে। FreeGLUT specific। প্রতিটি character loop করতে হয় না।`,
          example: `glRasterPos2f(-0.5f, 0.0f);
glutBitmapString(GLUT_BITMAP_HELVETICA_18,
    (const unsigned char*)"Hello World!");`,
        },
        {
          name: "glutBitmapWidth(void *font, int character)",
          signature: "int glutBitmapWidth(void *font, int character)",
          params: "font: Font constant, character: ASCII code",
          returns: "int: Pixel width of character",
          explanation: `একটি character এর pixel width return করে। Text centering বা layout এর জন্য দরকারি।`,
          example: `int w = glutBitmapWidth(GLUT_BITMAP_HELVETICA_18, 'A');`,
        },
        {
          name: "glutBitmapLength(void *font, const unsigned char *string) [FreeGLUT]",
          signature: "int glutBitmapLength(void *font, const unsigned char *string)",
          params: "font: Font, string: text",
          returns: "int: Total pixel width",
          explanation: `পুরো string এর total pixel width return করে।`,
          example: `const char* msg = "Score: 100";
int len = glutBitmapLength(GLUT_BITMAP_HELVETICA_18,
    (const unsigned char*)msg);
// Center করতে: glRasterPos2f(-len/windowWidth, 0);`,
        },
        {
          name: "glutStrokeCharacter(void *font, int character)",
          signature: "void glutStrokeCharacter(void *font, int character)",
          params: "font: Stroke font constant, character: ASCII code",
          returns: "void",
          explanation: `Stroke (vector) font ব্যবহার করে character render করে। Bitmap এর মতো না — এগুলো actual 3D geometry। glScalef() দিয়ে scale করা যায়।`,
          example: `glPushMatrix();
glTranslatef(-1.0f, 0.0f, 0.0f);
glScalef(0.003f, 0.003f, 1.0f);  // Scale down
const char* text = "OpenGL";
while(*text) {
    glutStrokeCharacter(GLUT_STROKE_ROMAN, *text++);
}
glPopMatrix();`,
          fonts: [
            "GLUT_STROKE_ROMAN — Proportional Roman font",
            "GLUT_STROKE_MONO_ROMAN — Monospaced Roman font"
          ]
        },
        {
          name: "glutStrokeString(void *font, const unsigned char *string) [FreeGLUT]",
          signature: "void glutStrokeString(void *font, const unsigned char *string)",
          params: "font, string",
          returns: "void",
          explanation: `Stroke font দিয়ে পুরো string render করে।`,
          example: `glutStrokeString(GLUT_STROKE_ROMAN, (unsigned char*)"Hello");`,
        },
        {
          name: "glutStrokeWidth(void *font, int character)",
          signature: "int glutStrokeWidth(void *font, int character)",
          params: "font, character",
          returns: "int: stroke units width",
          explanation: `Stroke character এর width return করে (stroke units এ)।`,
          example: `int w = glutStrokeWidth(GLUT_STROKE_ROMAN, 'M');`,
        },
        {
          name: "glutStrokeLength(void *font, const unsigned char *string) [FreeGLUT]",
          signature: "int glutStrokeLength(void *font, const unsigned char *string)",
          params: "font, string",
          returns: "int: total length in stroke units",
          explanation: `Stroke font এ পুরো string এর length return করে।`,
          example: `int len = glutStrokeLength(GLUT_STROKE_ROMAN, (unsigned char*)"Hello");`,
        },
      ]
    },
    {
      id: "shapes",
      emoji: "🔷",
      title: "GLUT — 3D Shape / Solid & Wireframe Drawing",
      description: "Pre-built 3D shapes wireframe বা solid হিসেবে draw করার functions",
      functions: [
        {
          name: "glutSolidSphere / glutWireSphere",
          signature: "void glutSolidSphere(GLdouble radius, GLint slices, GLint stacks)\nvoid glutWireSphere(GLdouble radius, GLint slices, GLint stacks)",
          params: "radius: sphere এর radius, slices: vertical divisions, stacks: horizontal divisions",
          returns: "void",
          explanation: `Sphere draw করে। Solid = filled, Wire = wireframe। slices বাড়ালে smooth circle, কমালে polygon দেখায়।`,
          example: `// Solid sphere, radius 1, 32 divisions:
glutSolidSphere(1.0, 32, 32);

// Wireframe sphere:
glutWireSphere(1.0, 16, 16);`,
        },
        {
          name: "glutSolidCube / glutWireCube",
          signature: "void glutSolidCube(GLdouble size)\nvoid glutWireCube(GLdouble size)",
          params: "size: cube এর edge length",
          returns: "void",
          explanation: `Centered cube draw করে। size=2 মানে -1 থেকে +1।`,
          example: `glutSolidCube(2.0);  // 2×2×2 cube
glutWireCube(1.0);   // 1×1×1 wireframe cube`,
        },
        {
          name: "glutSolidCone / glutWireCone",
          signature: "void glutSolidCone(GLdouble base, GLdouble height, GLint slices, GLint stacks)",
          params: "base: base radius, height: height, slices: divisions",
          returns: "void",
          explanation: `Cone draw করে। Base Z=0 এ, apex উপরে।`,
          example: `glutSolidCone(0.5, 1.0, 32, 1);
glutWireCone(0.5, 1.0, 16, 4);`,
        },
        {
          name: "glutSolidTorus / glutWireTorus",
          signature: "void glutSolidTorus(GLdouble innerRadius, GLdouble outerRadius, GLint nsides, GLint rings)",
          params: "innerRadius: hole radius, outerRadius: outer radius, nsides/rings: divisions",
          returns: "void",
          explanation: `Donut/torus shape draw করে।`,
          example: `glutSolidTorus(0.2, 0.8, 32, 64);
glutWireTorus(0.2, 0.8, 16, 32);`,
        },
        {
          name: "glutSolidTetrahedron / glutWireTetrahedron",
          signature: "void glutSolidTetrahedron(void)\nvoid glutWireTetrahedron(void)",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `4-faced regular tetrahedron। ±1 range এ centered।`,
          example: `glutSolidTetrahedron();`,
        },
        {
          name: "glutSolidOctahedron / glutWireOctahedron",
          signature: "void glutSolidOctahedron(void)\nvoid glutWireOctahedron(void)",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `8-faced octahedron (2 pyramids base-to-base)।`,
          example: `glutSolidOctahedron();`,
        },
        {
          name: "glutSolidDodecahedron / glutWireDodecahedron",
          signature: "void glutSolidDodecahedron(void)\nvoid glutWireDodecahedron(void)",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `12-faced dodecahedron (pentagonal faces)।`,
          example: `glutSolidDodecahedron();`,
        },
        {
          name: "glutSolidIcosahedron / glutWireIcosahedron",
          signature: "void glutSolidIcosahedron(void)\nvoid glutWireIcosahedron(void)",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `20-faced icosahedron (triangular faces)।`,
          example: `glutSolidIcosahedron();`,
        },
        {
          name: "glutSolidTeapot / glutWireTeapot",
          signature: "void glutSolidTeapot(GLdouble size)\nvoid glutWireTeapot(GLdouble size)",
          params: "size: teapot এর size",
          returns: "void",
          explanation: `Utah Teapot — Computer graphics এর সবচেয়ে iconic 3D model! Test object হিসেবে বিখ্যাত।`,
          example: `glutSolidTeapot(1.0);  // Classic teapot!`,
          note: "Utah Teapot 1975 সালে Martin Newell তৈরি করেছিলেন। এটি CG এর 'Hello World' এর মতো।"
        },
        {
          name: "glutSolidCylinder / glutWireCylinder [FreeGLUT]",
          signature: "void glutSolidCylinder(GLdouble radius, GLdouble height, GLint slices, GLint stacks)",
          params: "radius, height, slices, stacks",
          returns: "void",
          explanation: `FreeGLUT specific। Cylinder draw করে। Base Z=0, top Z=height।`,
          example: `glutSolidCylinder(0.5, 2.0, 32, 1);`,
        },
        {
          name: "glutSolidRhombicDodecahedron / glutWireRhombicDodecahedron [FreeGLUT]",
          signature: "void glutSolidRhombicDodecahedron(void)",
          params: "none",
          returns: "void",
          explanation: `12-faced rhombic dodecahedron। FreeGLUT specific।`,
          example: `glutSolidRhombicDodecahedron();`,
        },
        {
          name: "glutSolidSierpinskiSponge [FreeGLUT]",
          signature: "void glutSolidSierpinskiSponge(int num_levels, GLdouble offset[3], GLdouble scale)",
          params: "num_levels: recursion depth, offset: position, scale: size",
          returns: "void",
          explanation: `Sierpinski Sponge (3D fractal) draw করে। Fractal geometry!`,
          example: `GLdouble offset[] = {0,0,0};
glutSolidSierpinskiSponge(3, offset, 1.0);`,
        },
      ]
    },
    {
      id: "query",
      emoji: "❓",
      title: "GLUT — Query / Get Functions",
      description: "GLUT এবং system এর information query করার functions",
      functions: [
        {
          name: "glutGet(GLenum state)",
          signature: "int glutGet(GLenum state)",
          params: "state: GLUT_* constant",
          returns: "int: Requested value",
          explanation: `GLUT এর বিভিন্ন state values query করে।`,
          example: `int w = glutGet(GLUT_WINDOW_WIDTH);
int h = glutGet(GLUT_WINDOW_HEIGHT);
int x = glutGet(GLUT_WINDOW_X);
int y = glutGet(GLUT_WINDOW_Y);
int screenW = glutGet(GLUT_SCREEN_WIDTH);
int screenH = glutGet(GLUT_SCREEN_HEIGHT);`,
          states: [
            "GLUT_WINDOW_X/Y — Window position",
            "GLUT_WINDOW_WIDTH/HEIGHT — Window size",
            "GLUT_WINDOW_BUFFER_SIZE — Color buffer depth",
            "GLUT_WINDOW_STENCIL_SIZE — Stencil bits",
            "GLUT_WINDOW_DEPTH_SIZE — Depth buffer bits",
            "GLUT_WINDOW_DOUBLEBUFFER — Double buffered?",
            "GLUT_SCREEN_WIDTH/HEIGHT — Screen resolution",
            "GLUT_SCREEN_WIDTH_MM/HEIGHT_MM — Screen size in mm",
            "GLUT_MENU_NUM_ITEMS — Current menu item count",
            "GLUT_DISPLAY_MODE_POSSIBLE — Display mode supported?",
            "GLUT_ELAPSED_TIME — ms since glutInit()",
          ]
        },
        {
          name: "glutDeviceGet(GLenum info)",
          signature: "int glutDeviceGet(GLenum info)",
          params: "info: Device query constant",
          returns: "int",
          explanation: `Input device সম্পর্কে query করে।`,
          example: `int buttons = glutDeviceGet(GLUT_NUM_MOUSE_BUTTONS);
int hasKeyboard = glutDeviceGet(GLUT_HAS_KEYBOARD);`,
          states: [
            "GLUT_HAS_KEYBOARD",
            "GLUT_HAS_MOUSE",
            "GLUT_NUM_MOUSE_BUTTONS",
            "GLUT_HAS_JOYSTICK",
            "GLUT_NUM_JOYSTICK_BUTTONS",
            "GLUT_HAS_DIAL_AND_BUTTON_BOX",
            "GLUT_NUM_DIALS",
            "GLUT_NUM_BUTTON_BOX_BUTTONS",
            "GLUT_HAS_TABLET",
          ]
        },
        {
          name: "glutExtensionSupported(const char *extension)",
          signature: "int glutExtensionSupported(const char *extension)",
          params: "extension: Extension name string",
          returns: "int: 1 if supported, 0 if not",
          explanation: `OpenGL extension supported কিনা check করে।`,
          example: `if(glutExtensionSupported("GL_ARB_multitexture")) {
    // Use multi-texturing
}`,
        },
        {
          name: "glutGetModifiers()",
          signature: "int glutGetModifiers()",
          params: "কোনো parameter নেই",
          returns: "int: Modifier key bitmask",
          explanation: `Keyboard/mouse callback এর ভেতরে call করলে Shift, Ctrl, Alt এর state জানা যায়।`,
          example: `void keyboard(unsigned char key, int x, int y) {
    int mod = glutGetModifiers();
    if(mod & GLUT_ACTIVE_SHIFT) {
        printf("Shift+%c\\n", key);
    }
    if(mod & GLUT_ACTIVE_CTRL) {
        printf("Ctrl+%c\\n", key);
    }
    if(mod & GLUT_ACTIVE_ALT) {
        printf("Alt+%c\\n", key);
    }
}`,
        },
        {
          name: "glutVideoResizeGet(GLenum info)",
          signature: "int glutVideoResizeGet(GLenum info)",
          params: "info: Video resize query",
          returns: "int",
          explanation: `Video resize feature সম্পর্কে query।`,
          example: `int supported = glutVideoResizeGet(GLUT_VIDEO_RESIZE_POSSIBLE);`,
        },
      ]
    },
    {
      id: "color",
      emoji: "🎨",
      title: "GLUT — Color Map Functions",
      description: "Indexed color mode (color index) manage করার functions",
      functions: [
        {
          name: "glutSetColor(int cell, GLfloat red, GLfloat green, GLfloat blue)",
          signature: "void glutSetColor(int cell, GLfloat red, GLfloat green, GLfloat blue)",
          params: "cell: color index (0-255), red/green/blue: 0.0-1.0",
          returns: "void",
          explanation: `Color index mode এ specific index এর color set করে। Indexed color (GLUT_INDEX mode) এ ব্যবহার হয়।`,
          example: `glutSetColor(0, 1.0f, 0.0f, 0.0f);  // Index 0 = Red`,
        },
        {
          name: "glutGetColor(int cell, int component)",
          signature: "GLfloat glutGetColor(int cell, int component)",
          params: "cell: color index, component: GLUT_RED/GREEN/BLUE",
          returns: "GLfloat: Color component value",
          explanation: `Color index mode এ color entry query করে।`,
          example: `GLfloat r = glutGetColor(0, GLUT_RED);`,
        },
        {
          name: "glutCopyColormap(int win)",
          signature: "void glutCopyColormap(int win)",
          params: "win: source window ID",
          returns: "void",
          explanation: `অন্য window এর colormap copy করে।`,
          example: `glutCopyColormap(otherWindowID);`,
        },
      ]
    },
    {
      id: "joystick",
      emoji: "🕹️",
      title: "GLUT — Joystick / Spaceball / Tablet Functions",
      description: "Special input devices handle করার functions",
      functions: [
        {
          name: "glutJoystickFunc(void (*func)(...), int pollInterval)",
          signature: "void glutJoystickFunc(void (*func)(unsigned int, int, int, int), int pollInterval)",
          params: "func: callback(buttonMask, x, y, z), pollInterval: ms polling interval",
          returns: "void",
          explanation: `Joystick input callback register করে। x, y, z axes হলো -1000 থেকে +1000।`,
          example: `void joystickCallback(unsigned int buttons, int x, int y, int z) {
    printf("Joy: x=%d y=%d z=%d buttons=%u\\n", x, y, z, buttons);
}
glutJoystickFunc(joystickCallback, 100);  // Poll every 100ms`,
        },
        {
          name: "glutForceJoystickFunc()",
          signature: "void glutForceJoystickFunc()",
          params: "none",
          returns: "void",
          explanation: `Joystick callback এখনই force call করে (polling interval এর জন্য না অপেক্ষা করে)।`,
          example: `glutForceJoystickFunc();`,
        },
        {
          name: "glutSpaceballMotionFunc(void (*func)(int x, int y, int z))",
          signature: "void glutSpaceballMotionFunc(void (*func)(int, int, int))",
          params: "x, y, z: Translation axes",
          returns: "void",
          explanation: `Spaceball 3D input device এর motion callback।`,
          example: `glutSpaceballMotionFunc(spaceballMotion);`,
        },
        {
          name: "glutSpaceballRotateFunc(void (*func)(int x, int y, int z))",
          signature: "void glutSpaceballRotateFunc(void (*func)(int, int, int))",
          params: "x, y, z: Rotation axes",
          returns: "void",
          explanation: `Spaceball rotation callback।`,
          example: `glutSpaceballRotateFunc(spaceballRotate);`,
        },
        {
          name: "glutSpaceballButtonFunc(void (*func)(int button, int state))",
          signature: "void glutSpaceballButtonFunc(void (*func)(int, int))",
          params: "button, state",
          returns: "void",
          explanation: `Spaceball button callback।`,
          example: `glutSpaceballButtonFunc(spaceballButton);`,
        },
        {
          name: "glutButtonBoxFunc(void (*func)(int button, int state))",
          signature: "void glutButtonBoxFunc(void (*func)(int, int))",
          params: "button, state",
          returns: "void",
          explanation: `Dial and button box device এর button callback।`,
          example: `glutButtonBoxFunc(buttonBoxCB);`,
        },
        {
          name: "glutDialsFunc(void (*func)(int dial, int value))",
          signature: "void glutDialsFunc(void (*func)(int, int))",
          params: "dial: dial number, value: current value",
          returns: "void",
          explanation: `Dial input device callback।`,
          example: `glutDialsFunc(dialsCB);`,
        },
        {
          name: "glutTabletMotionFunc(void (*func)(int x, int y))",
          signature: "void glutTabletMotionFunc(void (*func)(int, int))",
          params: "x, y: tablet position",
          returns: "void",
          explanation: `Graphics tablet motion callback।`,
          example: `glutTabletMotionFunc(tabletMotion);`,
        },
        {
          name: "glutTabletButtonFunc(void (*func)(int button, int state, int x, int y))",
          signature: "void glutTabletButtonFunc(void (*func)(int, int, int, int))",
          params: "button, state, x, y",
          returns: "void",
          explanation: `Graphics tablet button callback।`,
          example: `glutTabletButtonFunc(tabletButton);`,
        },
      ]
    },
    {
      id: "gl_state",
      emoji: "⚙️",
      title: "OpenGL — State Management (glEnable/glDisable/glGet)",
      description: "OpenGL state machine এর capabilities enable/disable এবং query করা",
      functions: [
        {
          name: "glEnable(GLenum cap) / glDisable(GLenum cap)",
          signature: "void glEnable(GLenum cap)\nvoid glDisable(GLenum cap)",
          params: "cap: Capability constant (GL_DEPTH_TEST, GL_LIGHTING, ইত্যাদি)",
          returns: "void",
          explanation: `OpenGL হলো একটি state machine। glEnable/glDisable দিয়ে বিভিন্ন features on/off করা হয়।`,
          example: `glEnable(GL_DEPTH_TEST);     // 3D depth testing
glEnable(GL_LIGHTING);      // Lighting
glEnable(GL_LIGHT0);        // Light 0
glEnable(GL_TEXTURE_2D);    // 2D texturing
glEnable(GL_BLEND);         // Alpha blending
glEnable(GL_NORMALIZE);     // Auto-normalize normals
glEnable(GL_CULL_FACE);     // Back-face culling
glEnable(GL_FOG);           // Fog effect
glEnable(GL_LINE_SMOOTH);   // Anti-aliased lines
glEnable(GL_POINT_SMOOTH);  // Anti-aliased points
glEnable(GL_POLYGON_SMOOTH);// Anti-aliased polygons
glEnable(GL_STENCIL_TEST);  // Stencil test
glEnable(GL_SCISSOR_TEST);  // Scissor test
glEnable(GL_ALPHA_TEST);    // Alpha test
glEnable(GL_COLOR_MATERIAL);// Material follows color`,
        },
        {
          name: "glIsEnabled(GLenum cap)",
          signature: "GLboolean glIsEnabled(GLenum cap)",
          params: "cap: Capability to check",
          returns: "GL_TRUE বা GL_FALSE",
          explanation: `Capability enable আছে কিনা check করে।`,
          example: `if(glIsEnabled(GL_DEPTH_TEST)) {
    printf("Depth test is on\\n");
}`,
        },
        {
          name: "glGetBooleanv / glGetIntegerv / glGetFloatv / glGetDoublev",
          signature: "void glGetIntegerv(GLenum pname, GLint *params)\nvoid glGetFloatv(GLenum pname, GLfloat *params)",
          params: "pname: State to query, params: output buffer",
          returns: "void",
          explanation: `OpenGL state values query করে। Matrix, viewport, color, অনেক কিছু জানা যায়।`,
          example: `// Current matrix পড়া:
GLfloat matrix[16];
glGetFloatv(GL_MODELVIEW_MATRIX, matrix);

// Viewport পড়া:
GLint viewport[4];
glGetIntegerv(GL_VIEWPORT, viewport);
printf("Viewport: %d %d %d %d\\n",
    viewport[0], viewport[1], viewport[2], viewport[3]);`,
        },
        {
          name: "glGetString(GLenum name)",
          signature: "const GLubyte* glGetString(GLenum name)",
          params: "name: GL_VERSION, GL_VENDOR, GL_RENDERER, GL_EXTENSIONS",
          returns: "const GLubyte*: String",
          explanation: `OpenGL implementation সম্পর্কে string information।`,
          example: `printf("GL Version: %s\\n", glGetString(GL_VERSION));
printf("Vendor: %s\\n", glGetString(GL_VENDOR));
printf("Renderer: %s\\n", glGetString(GL_RENDERER));
// Extensions:
const char* ext = (char*)glGetString(GL_EXTENSIONS);`,
        },
        {
          name: "glPushAttrib / glPopAttrib",
          signature: "void glPushAttrib(GLbitfield mask)\nvoid glPopAttrib()",
          params: "mask: Attribute groups to save",
          returns: "void",
          explanation: `OpenGL state attributes save/restore করে। Complex state management এর জন্য দরকারি।`,
          example: `glPushAttrib(GL_LIGHTING_BIT | GL_COLOR_BUFFER_BIT);
    // Temporarily change lighting and blending
    glDisable(GL_LIGHTING);
    glEnable(GL_BLEND);
    // Draw something
glPopAttrib();  // Restore original state`,
          masks: [
            "GL_LIGHTING_BIT — Lighting state",
            "GL_COLOR_BUFFER_BIT — Color buffer state",
            "GL_DEPTH_BUFFER_BIT — Depth buffer state",
            "GL_ENABLE_BIT — All enable/disable states",
            "GL_TEXTURE_BIT — Texture state",
            "GL_TRANSFORM_BIT — Transform state",
            "GL_VIEWPORT_BIT — Viewport state",
            "GL_ALL_ATTRIB_BITS — সব কিছু",
          ]
        },
        {
          name: "glPushClientAttrib / glPopClientAttrib",
          signature: "void glPushClientAttrib(GLbitfield mask)\nvoid glPopClientAttrib()",
          params: "mask: Client attribute bits",
          returns: "void",
          explanation: `Client-side (CPU) state save/restore করে।`,
          example: `glPushClientAttrib(GL_CLIENT_VERTEX_ARRAY_BIT);
    // Change vertex array state
glPopClientAttrib();`,
        },
      ]
    },
    {
      id: "gl_clear",
      emoji: "🧹",
      title: "OpenGL — Buffer Clear & Color Functions",
      description: "Screen clear করা এবং drawing color set করার functions",
      functions: [
        {
          name: "glClear(GLbitfield mask)",
          signature: "void glClear(GLbitfield mask)",
          params: "mask: কোন buffer clear হবে",
          returns: "void",
          explanation: `প্রতিটি frame এর শুরুতে buffer clear করতে হয়।`,
          example: `// সাধারণ:
glClear(GL_COLOR_BUFFER_BIT);

// 3D scene এর জন্য:
glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

// Stencil সহ:
glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);`,
          masks: [
            "GL_COLOR_BUFFER_BIT — Color buffer clear (background color)",
            "GL_DEPTH_BUFFER_BIT — Depth buffer reset to max",
            "GL_STENCIL_BUFFER_BIT — Stencil buffer clear",
            "GL_ACCUM_BUFFER_BIT — Accumulation buffer clear",
          ]
        },
        {
          name: "glClearColor(GLfloat r, GLfloat g, GLfloat b, GLfloat a)",
          signature: "void glClearColor(GLfloat red, GLfloat green, GLfloat blue, GLfloat alpha)",
          params: "r, g, b, a: 0.0-1.0",
          returns: "void",
          explanation: `Color buffer clear হলে কোন color দিয়ে fill হবে তা set করে। Background color।`,
          example: `glClearColor(0.0f, 0.0f, 0.0f, 1.0f);  // Black background
glClearColor(0.2f, 0.3f, 0.3f, 1.0f);  // Dark teal
glClearColor(1.0f, 1.0f, 1.0f, 1.0f);  // White`,
        },
        {
          name: "glClearDepth(GLdouble depth)",
          signature: "void glClearDepth(GLdouble depth)",
          params: "depth: 0.0-1.0 (default 1.0)",
          returns: "void",
          explanation: `Depth buffer clear value set করে। 1.0 = far plane।`,
          example: `glClearDepth(1.0);  // Default - clear to maximum depth`,
        },
        {
          name: "glClearStencil(GLint s)",
          signature: "void glClearStencil(GLint s)",
          params: "s: Stencil clear value (default 0)",
          returns: "void",
          explanation: `Stencil buffer clear value set করে।`,
          example: `glClearStencil(0);`,
        },
        {
          name: "glClearAccum(GLfloat r, GLfloat g, GLfloat b, GLfloat a)",
          signature: "void glClearAccum(GLfloat r, GLfloat g, GLfloat b, GLfloat a)",
          params: "r, g, b, a: Accumulation buffer clear values",
          returns: "void",
          explanation: `Accumulation buffer clear value set করে।`,
          example: `glClearAccum(0.0f, 0.0f, 0.0f, 0.0f);`,
        },
        {
          name: "glColor3f/4f (and variants)",
          signature: "void glColor3f(GLfloat r, GLfloat g, GLfloat b)\nvoid glColor4f(GLfloat r, GLfloat g, GLfloat b, GLfloat a)",
          params: "r, g, b: Color (0.0-1.0), a: Alpha",
          returns: "void",
          explanation: `Current drawing color set করে। এরপর যা draw হবে সব এই color এ হবে।\n\nVariants:\n• glColor3b/3s/3i/3f/3d — Byte/Short/Int/Float/Double\n• glColor4b/4s/4i/4f/4d — 4 component versions\n• glColor3ub/3us/3ui — Unsigned versions (0-255 range for ub)\n• glColor3fv(float[3]) — Array version`,
          example: `glColor3f(1.0f, 0.0f, 0.0f);  // Red
glColor3f(0.0f, 1.0f, 0.0f);  // Green
glColor3f(0.0f, 0.0f, 1.0f);  // Blue
glColor3f(1.0f, 1.0f, 0.0f);  // Yellow
glColor3f(1.0f, 1.0f, 1.0f);  // White
glColor3f(0.0f, 0.0f, 0.0f);  // Black
glColor4f(1.0f, 0.0f, 0.0f, 0.5f);  // Semi-transparent red

// Unsigned byte (0-255):
glColor3ub(255, 128, 0);  // Orange`,
        },
        {
          name: "glColorMask(GLboolean r, GLboolean g, GLboolean b, GLboolean a)",
          signature: "void glColorMask(GLboolean r, GLboolean g, GLboolean b, GLboolean a)",
          params: "r, g, b, a: GL_TRUE/GL_FALSE",
          returns: "void",
          explanation: `কোন color channels লেখা যাবে তা control করে।`,
          example: `glColorMask(GL_TRUE, GL_FALSE, GL_FALSE, GL_TRUE);  // Only R and A
glColorMask(GL_FALSE, GL_FALSE, GL_FALSE, GL_FALSE); // Depth-only pass`,
        },
      ]
    },
    {
      id: "gl_draw",
      emoji: "✏️",
      title: "OpenGL — Drawing / Geometry Functions",
      description: "Vertices define করে geometry draw করার core functions",
      functions: [
        {
          name: "glBegin(GLenum mode) / glEnd()",
          signature: "void glBegin(GLenum mode)\nvoid glEnd()",
          params: "mode: Primitive type",
          returns: "void",
          explanation: `Legacy/Immediate mode drawing এ vertex specification শুরু/শেষ করে। glBegin ও glEnd এর মধ্যে শুধু glVertex, glColor, glNormal, glTexCoord call করা যায়।`,
          example: `// Triangle:
glBegin(GL_TRIANGLES);
    glColor3f(1,0,0); glVertex2f(0, 0.5f);
    glColor3f(0,1,0); glVertex2f(-0.5f, -0.5f);
    glColor3f(0,0,1); glVertex2f(0.5f, -0.5f);
glEnd();

// Square:
glBegin(GL_QUADS);
    glVertex2f(-0.5f, -0.5f);
    glVertex2f( 0.5f, -0.5f);
    glVertex2f( 0.5f,  0.5f);
    glVertex2f(-0.5f,  0.5f);
glEnd();`,
          modes: [
            "GL_POINTS — Individual points",
            "GL_LINES — Pairs of vertices = lines",
            "GL_LINE_STRIP — Connected lines",
            "GL_LINE_LOOP — Closed loop",
            "GL_TRIANGLES — Every 3 vertices = triangle",
            "GL_TRIANGLE_STRIP — Shared edge triangles",
            "GL_TRIANGLE_FAN — Fan from first vertex",
            "GL_QUADS — Every 4 vertices = quad",
            "GL_QUAD_STRIP — Connected quads",
            "GL_POLYGON — Single convex polygon",
          ]
        },
        {
          name: "glVertex2f/3f/4f (and variants)",
          signature: "void glVertex2f(GLfloat x, GLfloat y)\nvoid glVertex3f(GLfloat x, GLfloat y, GLfloat z)\nvoid glVertex4f(GLfloat x, GLfloat y, GLfloat z, GLfloat w)",
          params: "x, y, z, w: Vertex coordinates",
          returns: "void",
          explanation: `Vertex (point) define করে। glBegin/glEnd এর মধ্যে ব্যবহার।\n\nSuffix:\n• 2: x, y (z=0, w=1)\n• 3: x, y, z (w=1)\n• 4: x, y, z, w (homogeneous)\n• f: float, d: double, i: int, s: short\n• v: vector/array version`,
          example: `glVertex2f(0.5f, 0.5f);          // 2D
glVertex3f(1.0f, 2.0f, 3.0f);    // 3D
glVertex2i(100, 200);             // Integer coords
float pos[] = {1.0f, 1.0f, 0.0f};
glVertex3fv(pos);                 // Array version`,
        },
        {
          name: "glNormal3f (and variants)",
          signature: "void glNormal3f(GLfloat nx, GLfloat ny, GLfloat nz)",
          params: "nx, ny, nz: Normal vector components",
          returns: "void",
          explanation: `Surface normal set করে। Lighting calculation এর জন্য প্রয়োজনীয়। glVertex call এর আগে set করতে হয়।`,
          example: `glBegin(GL_TRIANGLES);
    glNormal3f(0, 0, 1);    // Pointing toward viewer
    glVertex3f(-1, -1, 0);
    glNormal3f(0, 0, 1);
    glVertex3f( 1, -1, 0);
    glNormal3f(0, 0, 1);
    glVertex3f( 0,  1, 0);
glEnd();`,
        },
        {
          name: "glTexCoord2f (and variants)",
          signature: "void glTexCoord2f(GLfloat s, GLfloat t)",
          params: "s, t: Texture coordinates (0.0-1.0)",
          returns: "void",
          explanation: `Texture coordinate set করে। Texture mapping এর জন্য। glVertex call এর আগে set করতে হয়।`,
          example: `glBegin(GL_QUADS);
    glTexCoord2f(0,0); glVertex2f(-1,-1);
    glTexCoord2f(1,0); glVertex2f( 1,-1);
    glTexCoord2f(1,1); glVertex2f( 1, 1);
    glTexCoord2f(0,1); glVertex2f(-1, 1);
glEnd();`,
        },
        {
          name: "glRasterPos2f/3f (and variants)",
          signature: "void glRasterPos2f(GLfloat x, GLfloat y)\nvoid glRasterPos3f(GLfloat x, GLfloat y, GLfloat z)",
          params: "x, y, z: World space position",
          returns: "void",
          explanation: `Bitmap ও text rendering এর জন্য raster position set করে। glBitmap এবং glutBitmapCharacter এর starting position।`,
          example: `glRasterPos2f(-0.5f, 0.5f);
glutBitmapCharacter(GLUT_BITMAP_HELVETICA_18, 'A');`,
        },
        {
          name: "glWindowPos2f/3f [OpenGL 1.4+]",
          signature: "void glWindowPos2f(GLfloat x, GLfloat y)",
          params: "x, y: Window/screen pixel coordinates",
          returns: "void",
          explanation: `Pixel coordinates তে directly raster position set করে। Projection/modelview matrix ignore করে। HUD/overlay drawing এর জন্য সুবিধাজনক।`,
          example: `glWindowPos2i(10, 10);  // 10px from bottom-left
glutBitmapString(GLUT_BITMAP_8_BY_13, (unsigned char*)"Score: 100");`,
        },
        {
          name: "glPointSize(GLfloat size)",
          signature: "void glPointSize(GLfloat size)",
          params: "size: Point diameter in pixels",
          returns: "void",
          explanation: `GL_POINTS draw করার সময় point এর size (diameter) set করে।`,
          example: `glPointSize(5.0f);  // 5 pixel points
glBegin(GL_POINTS);
    glVertex2f(0, 0);
    glVertex2f(0.5f, 0.5f);
glEnd();`,
        },
        {
          name: "glLineWidth(GLfloat width)",
          signature: "void glLineWidth(GLfloat width)",
          params: "width: Line width in pixels",
          returns: "void",
          explanation: `Line এর width set করে।`,
          example: `glLineWidth(3.0f);
glBegin(GL_LINES);
    glVertex2f(-0.5f, 0); glVertex2f(0.5f, 0);
glEnd();
glLineWidth(1.0f);  // Reset`,
        },
        {
          name: "glLineStipple(GLint factor, GLushort pattern)",
          signature: "void glLineStipple(GLint factor, GLushort pattern)",
          params: "factor: Repetition factor (1-256), pattern: 16-bit bit pattern",
          returns: "void",
          explanation: `Dashed/dotted lines তৈরির জন্য। glEnable(GL_LINE_STIPPLE) করতে হবে।`,
          example: `glEnable(GL_LINE_STIPPLE);
glLineStipple(1, 0xAAAA);  // Dotted line (alternating bits)
glLineStipple(2, 0x00FF);  // Dashed line (8 on, 8 off)
// ... draw lines ...
glDisable(GL_LINE_STIPPLE);`,
        },
        {
          name: "glPolygonMode(GLenum face, GLenum mode)",
          signature: "void glPolygonMode(GLenum face, GLenum mode)",
          params: "face: GL_FRONT/BACK/FRONT_AND_BACK, mode: GL_FILL/LINE/POINT",
          returns: "void",
          explanation: `Polygon এর rendering mode set করে।`,
          example: `glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);   // Wireframe
glPolygonMode(GL_FRONT_AND_BACK, GL_FILL);   // Solid (default)
glPolygonMode(GL_FRONT_AND_BACK, GL_POINT);  // Points only`,
        },
        {
          name: "glPolygonOffset(GLfloat factor, GLfloat units)",
          signature: "void glPolygonOffset(GLfloat factor, GLfloat units)",
          params: "factor, units: depth offset values",
          returns: "void",
          explanation: `Z-fighting prevent করতে polygon এর depth values কিছুটা offset করে। Wireframe + solid এর জন্য দরকারি।`,
          example: `// Solid object আঁকো, তারপর wireframe
glEnable(GL_POLYGON_OFFSET_LINE);
glPolygonOffset(-1.0f, -1.0f);  // Slightly forward
glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);
// Draw wireframe
glDisable(GL_POLYGON_OFFSET_LINE);`,
        },
        {
          name: "glRect(GLfloat x1, GLfloat y1, GLfloat x2, GLfloat y2)",
          signature: "void glRectf(GLfloat x1, GLfloat y1, GLfloat x2, GLfloat y2)",
          params: "x1,y1: Corner 1, x2,y2: Corner 2",
          returns: "void",
          explanation: `Simple filled rectangle draw করে।`,
          example: `glRectf(-0.5f, -0.5f, 0.5f, 0.5f);  // Centered square`,
        },
      ]
    },
    {
      id: "gl_matrix",
      emoji: "🔢",
      title: "OpenGL — Matrix & Transformation Functions",
      description: "Transformation matrices manage করার functions",
      functions: [
        {
          name: "glMatrixMode(GLenum mode)",
          signature: "void glMatrixMode(GLenum mode)",
          params: "mode: GL_MODELVIEW, GL_PROJECTION, বা GL_TEXTURE",
          returns: "void",
          explanation: `কোন matrix stack active/current সেটা select করে। পরবর্তী matrix operations এই matrix এ হবে।\n\n• GL_MODELVIEW: Object transformations + camera\n• GL_PROJECTION: Projection (perspective/ortho)\n• GL_TEXTURE: Texture coordinate transformation`,
          example: `// Projection setup:
glMatrixMode(GL_PROJECTION);
glLoadIdentity();
gluPerspective(45, aspect, 0.1, 100);

// Back to modelview for drawing:
glMatrixMode(GL_MODELVIEW);
glLoadIdentity();`,
        },
        {
          name: "glLoadIdentity()",
          signature: "void glLoadIdentity()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Current matrix কে Identity matrix দিয়ে replace করে। Identity matrix এ multiply করলে কোনো পরিবর্তন হয় না — "reset" এর মতো।`,
          example: `glMatrixMode(GL_MODELVIEW);
glLoadIdentity();  // No transformation
gluLookAt(0,0,5, 0,0,0, 0,1,0);  // Camera setup`,
        },
        {
          name: "glLoadMatrixf(const GLfloat *m)",
          signature: "void glLoadMatrixf(const GLfloat *m)",
          params: "m: 16-element float array (column-major)",
          returns: "void",
          explanation: `Custom matrix load করে। Column-major order এ 4×4 matrix।`,
          example: `GLfloat identity[] = {
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
};
glLoadMatrixf(identity);`,
        },
        {
          name: "glMultMatrixf(const GLfloat *m)",
          signature: "void glMultMatrixf(const GLfloat *m)",
          params: "m: 16-element float array",
          returns: "void",
          explanation: `Current matrix এ custom matrix multiply করে।`,
          example: `glMultMatrixf(myTransformMatrix);`,
        },
        {
          name: "glTranslatef(GLfloat x, GLfloat y, GLfloat z)",
          signature: "void glTranslatef(GLfloat x, GLfloat y, GLfloat z)",
          params: "x, y, z: Translation amounts",
          returns: "void",
          explanation: `Translation matrix দিয়ে current matrix multiply করে। Object কে x, y, z দিকে সরায়।`,
          example: `glTranslatef(1.0f, 0.0f, 0.0f);   // Right 1 unit
glTranslatef(0.0f, 2.0f, -5.0f);  // Up 2, back 5`,
        },
        {
          name: "glRotatef(GLfloat angle, GLfloat x, GLfloat y, GLfloat z)",
          signature: "void glRotatef(GLfloat angle, GLfloat x, GLfloat y, GLfloat z)",
          params: "angle: Degrees, x/y/z: Rotation axis",
          returns: "void",
          explanation: `Rotation matrix দিয়ে current matrix multiply করে। (x,y,z) axis এর চারপাশে angle degrees ঘোরায়।`,
          example: `glRotatef(45.0f, 0, 0, 1);  // Z-axis, 45°
glRotatef(30.0f, 1, 0, 0);  // X-axis, 30°
glRotatef(angle, 0, 1, 0);  // Y-axis, animated`,
        },
        {
          name: "glScalef(GLfloat x, GLfloat y, GLfloat z)",
          signature: "void glScalef(GLfloat x, GLfloat y, GLfloat z)",
          params: "x, y, z: Scale factors",
          returns: "void",
          explanation: `Scale matrix দিয়ে current matrix multiply করে।`,
          example: `glScalef(2.0f, 2.0f, 2.0f);   // Double size
glScalef(1.0f, 2.0f, 1.0f);   // Stretch vertically
glScalef(-1.0f, 1.0f, 1.0f);  // Mirror horizontally`,
        },
        {
          name: "glPushMatrix() / glPopMatrix()",
          signature: "void glPushMatrix()\nvoid glPopMatrix()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `Matrix stack এ current matrix push/pop করে। Hierarchical transformations এর জন্য অপরিহার্য।`,
          example: `// Robot arm example:
glPushMatrix();
    glTranslatef(0, 0, 0);  // Body position
    drawBody();
    glPushMatrix();
        glTranslatef(1, 0.5, 0);  // Relative to body
        glRotatef(armAngle, 0, 0, 1);
        drawArm();
        glPushMatrix();
            glTranslatef(0.8, 0, 0);  // Relative to arm
            drawHand();
        glPopMatrix();
    glPopMatrix();
glPopMatrix();`,
        },
        {
          name: "glOrtho(GLdouble l, r, b, t, n, f)",
          signature: "void glOrtho(GLdouble left, right, bottom, top, near, far)",
          params: "left/right: X range, bottom/top: Y range, near/far: Z range",
          returns: "void",
          explanation: `Orthographic projection matrix set করে। Parallel projection — দূরে গেলেও size বদলায় না।`,
          example: `glMatrixMode(GL_PROJECTION);
glLoadIdentity();
glOrtho(-1, 1, -1, 1, -1, 1);  // Unit cube view

// 2D: Screen coordinates:
glOrtho(0, windowW, 0, windowH, -1, 1);`,
        },
        {
          name: "glFrustum(GLdouble l, r, b, t, n, f)",
          signature: "void glFrustum(GLdouble left, right, bottom, top, near, far)",
          params: "Frustum boundaries",
          returns: "void",
          explanation: `Perspective projection frustum manually set করে। gluPerspective এর low-level version।`,
          example: `glMatrixMode(GL_PROJECTION);
glLoadIdentity();
glFrustum(-0.5, 0.5, -0.5, 0.5, 1.0, 100.0);`,
        },
        {
          name: "glViewport(GLint x, GLint y, GLsizei w, GLsizei h)",
          signature: "void glViewport(GLint x, GLint y, GLsizei width, GLsizei height)",
          params: "x, y: Bottom-left corner, w, h: Size",
          returns: "void",
          explanation: `Normalized device coordinates কে screen pixels এ map করে। Window resize callback এ call করতে হয়।`,
          example: `void reshape(int w, int h) {
    glViewport(0, 0, w, h);  // Full window
    // Split screen (left half):
    glViewport(0, 0, w/2, h);
}`,
        },
        {
          name: "glDepthRange(GLdouble near, GLdouble far)",
          signature: "void glDepthRange(GLdouble nearVal, GLdouble farVal)",
          params: "nearVal, farVal: 0.0-1.0",
          returns: "void",
          explanation: `Depth buffer এর mapping range set করে।`,
          example: `glDepthRange(0.0, 1.0);  // Default`,
        },
      ]
    },
    {
      id: "glu_functions",
      emoji: "🔮",
      title: "GLU — OpenGL Utility Library Functions",
      description: "Higher-level utility functions — projection, quadrics, NURBS, tessellation",
      functions: [
        {
          name: "gluPerspective(fovy, aspect, near, far)",
          signature: "void gluPerspective(GLdouble fovy, GLdouble aspect, GLdouble near, GLdouble far)",
          params: "fovy: Field of view angle (Y-axis, degrees), aspect: width/height ratio, near/far: clip planes",
          returns: "void",
          explanation: `সবচেয়ে সহজ perspective projection setup। glFrustum এর convenient wrapper।\n\n• fovy: Camera এর vertical viewing angle। 45-60° normal, 90°+ wide angle\n• aspect: Window এর aspect ratio (width/height)\n• near: Near clip plane (খুব ছোট করো না — z-fighting হবে)\n• far: Far clip plane`,
          example: `void reshape(int w, int h) {
    glViewport(0, 0, w, h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(45.0,     // 45 degree FOV
                   (double)w/h,  // Aspect ratio
                   0.1,      // Near plane
                   1000.0);  // Far plane
    glMatrixMode(GL_MODELVIEW);
}`,
        },
        {
          name: "gluLookAt(eye, center, up)",
          signature: "void gluLookAt(GLdouble ex,ey,ez, cx,cy,cz, ux,uy,uz)",
          params: "eye: Camera position, center: Look target, up: Up direction",
          returns: "void",
          explanation: `Camera (view) matrix set করে। Camera কোথায় আছে, কোথায় তাকাচ্ছে এবং কোন দিক "উপরে" তা define করে।`,
          example: `glMatrixMode(GL_MODELVIEW);
glLoadIdentity();
gluLookAt(
    0, 0, 5,   // Camera at (0,0,5)
    0, 0, 0,   // Looking at origin
    0, 1, 0    // Y-axis is up
);`,
          note: "এটি একটি transformation matrix generate করে — actual camera নয়। Object কে উল্টো দিকে move করার মতো।"
        },
        {
          name: "gluOrtho2D(left, right, bottom, top)",
          signature: "void gluOrtho2D(GLdouble left, right, bottom, top)",
          params: "2D view boundaries",
          returns: "void",
          explanation: `2D orthographic projection setup করে। glOrtho(l,r,b,t,-1,1) এর shortcut।`,
          example: `glMatrixMode(GL_PROJECTION);
glLoadIdentity();
gluOrtho2D(0, 800, 0, 600);  // Pixel-space 2D
glMatrixMode(GL_MODELVIEW);`,
        },
        {
          name: "gluProject / gluUnProject",
          signature: "GLint gluProject(objX,Y,Z, model[16], proj[16], view[4], *winX,*winY,*winZ)\nGLint gluUnProject(winX,Y,Z, model, proj, view, *objX,*Y,*Z)",
          params: "Object/Window coordinates + matrices",
          returns: "GL_TRUE/GL_FALSE",
          explanation: `3D world coordinates ↔ 2D screen coordinates convert করে।\n\n• gluProject: 3D → 2D (object কোন screen pixel এ?)\n• gluUnProject: 2D → 3D (screen pixel কোন 3D ray?)\n\nMouse picking এর জন্য অপরিহার্য।`,
          example: `// Mouse picking - screen to world:
GLdouble modelview[16], projection[16];
GLint viewport[4];
GLdouble objX, objY, objZ;
glGetDoublev(GL_MODELVIEW_MATRIX, modelview);
glGetDoublev(GL_PROJECTION_MATRIX, projection);
glGetIntegerv(GL_VIEWPORT, viewport);

gluUnProject(mouseX, viewport[3]-mouseY, 0.0,
    modelview, projection, viewport,
    &objX, &objY, &objZ);`,
        },
        {
          name: "gluPickMatrix(x, y, delX, delY, viewport)",
          signature: "void gluPickMatrix(GLdouble x, y, delX, delY, GLint viewport[4])",
          params: "x,y: Pick center, delX/delY: Pick region size, viewport",
          returns: "void",
          explanation: `Selection mode এ pick region define করে। Mouse click এ কোন object click হয়েছে তা detect করতে।`,
          example: `glMatrixMode(GL_PROJECTION);
glLoadIdentity();
gluPickMatrix(mouseX, viewport[3]-mouseY, 5, 5, viewport);
gluPerspective(45, aspect, 0.1, 100);`,
        },
        {
          name: "gluNewQuadric()",
          signature: "GLUquadric* gluNewQuadric()",
          params: "কোনো parameter নেই",
          returns: "GLUquadric*: quadric object pointer",
          explanation: `Quadric object তৈরি করে। GLU quadric functions (sphere, cylinder, disk) এর জন্য প্রথমে এটি call করতে হয়।`,
          example: `GLUquadric* qobj = gluNewQuadric();
gluQuadricDrawStyle(qobj, GLU_FILL);
gluQuadricNormals(qobj, GLU_SMOOTH);
gluSphere(qobj, 1.0, 32, 32);
gluDeleteQuadric(qobj);`,
        },
        {
          name: "gluSphere(quad, radius, slices, stacks)",
          signature: "void gluSphere(GLUquadric* quad, GLdouble radius, GLint slices, GLint stacks)",
          params: "quad: quadric object, radius, slices, stacks",
          returns: "void",
          explanation: `Sphere draw করে। glutSolidSphere এর GLU version — বেশি control আছে।`,
          example: `GLUquadric* q = gluNewQuadric();
gluQuadricTexture(q, GL_TRUE);  // Texture coords generate
gluSphere(q, 1.0, 64, 64);`,
        },
        {
          name: "gluCylinder(quad, base, top, height, slices, stacks)",
          signature: "void gluCylinder(GLUquadric*, GLdouble base, top, height, GLint slices, stacks)",
          params: "base/top: radii (top=0 for cone), height, slices, stacks",
          returns: "void",
          explanation: `Cylinder বা cone draw করে। top=0 হলে cone।`,
          example: `GLUquadric* q = gluNewQuadric();
gluCylinder(q, 0.5, 0.5, 2.0, 32, 4); // Cylinder
gluCylinder(q, 0.5, 0.0, 1.5, 32, 4); // Cone`,
        },
        {
          name: "gluDisk(quad, inner, outer, slices, loops)",
          signature: "void gluDisk(GLUquadric*, GLdouble inner, outer, GLint slices, loops)",
          params: "inner: inner radius (0 = filled), outer: outer radius",
          returns: "void",
          explanation: `Disk (flat circle) বা ring draw করে। inner=0 হলে filled disk।`,
          example: `GLUquadric* q = gluNewQuadric();
gluDisk(q, 0, 1.0, 32, 1);        // Full circle
gluDisk(q, 0.5, 1.0, 32, 1);      // Ring/donut slice`,
        },
        {
          name: "gluPartialDisk(quad, inner, outer, slices, loops, start, sweep)",
          signature: "void gluPartialDisk(GLUquadric*, inner, outer, slices, loops, start, sweep)",
          params: "start: start angle (degrees), sweep: arc angle",
          returns: "void",
          explanation: `Partial disk (pie/arc shape) draw করে।`,
          example: `gluPartialDisk(q, 0, 1, 32, 1, 0, 90);  // Quarter circle`,
        },
        {
          name: "gluQuadricDrawStyle(quad, draw)",
          signature: "void gluQuadricDrawStyle(GLUquadric* quad, GLenum draw)",
          params: "draw: GLU_POINT/LINE/FILL/SILHOUETTE",
          returns: "void",
          explanation: `Quadric এর drawing style set করে।`,
          example: `gluQuadricDrawStyle(q, GLU_FILL);       // Solid
gluQuadricDrawStyle(q, GLU_LINE);       // Wireframe
gluQuadricDrawStyle(q, GLU_POINT);      // Points
gluQuadricDrawStyle(q, GLU_SILHOUETTE); // Outline`,
        },
        {
          name: "gluQuadricNormals(quad, normals)",
          signature: "void gluQuadricNormals(GLUquadric* quad, GLenum normals)",
          params: "normals: GLU_NONE/GLU_FLAT/GLU_SMOOTH",
          returns: "void",
          explanation: `Quadric এর normal generation mode set করে। Lighting এর জন্য।`,
          example: `gluQuadricNormals(q, GLU_SMOOTH);  // Smooth normals
gluQuadricNormals(q, GLU_FLAT);    // Flat normals
gluQuadricNormals(q, GLU_NONE);    // No normals (faster)`,
        },
        {
          name: "gluQuadricTexture(quad, texture)",
          signature: "void gluQuadricTexture(GLUquadric* quad, GLboolean texture)",
          params: "texture: GL_TRUE/GL_FALSE",
          returns: "void",
          explanation: `Quadric এর জন্য texture coordinates generate করবে কিনা।`,
          example: `gluQuadricTexture(q, GL_TRUE);  // Generate tex coords`,
        },
        {
          name: "gluQuadricOrientation(quad, orientation)",
          signature: "void gluQuadricOrientation(GLUquadric* quad, GLenum orientation)",
          params: "orientation: GLU_OUTSIDE বা GLU_INSIDE",
          returns: "void",
          explanation: `Normal কি বাইরের দিকে না ভেতরের দিকে।`,
          example: `gluQuadricOrientation(q, GLU_OUTSIDE);  // Default`,
        },
        {
          name: "gluDeleteQuadric(quad)",
          signature: "void gluDeleteQuadric(GLUquadric* quad)",
          params: "quad: quadric object",
          returns: "void",
          explanation: `Quadric object এর memory free করে।`,
          example: `gluDeleteQuadric(qobj);`,
        },
        {
          name: "gluScaleImage / gluBuild2DMipmaps",
          signature: "GLint gluScaleImage(...)\nGLint gluBuild2DMipmaps(target, comp, w, h, format, type, data)",
          params: "Image data and dimensions",
          returns: "GLint: 0 on success",
          explanation: `gluScaleImage: Image scale করে।\ngluBuild2DMipmaps: Automatically mipmaps generate করে। Texture এর জন্য।`,
          example: `unsigned char* pixels = loadImage("texture.raw");
gluBuild2DMipmaps(GL_TEXTURE_2D, 3, 256, 256,
    GL_RGB, GL_UNSIGNED_BYTE, pixels);`,
        },
        {
          name: "gluErrorString(GLenum error)",
          signature: "const GLubyte* gluErrorString(GLenum error)",
          params: "error: Error code",
          returns: "const GLubyte*: Error message string",
          explanation: `Error code কে human-readable string এ convert করে।`,
          example: `GLenum err = glGetError();
if(err != GL_NO_ERROR) {
    fprintf(stderr, "GL Error: %s\\n", gluErrorString(err));
}`,
        },
        {
          name: "gluGetString(GLenum name)",
          signature: "const GLubyte* gluGetString(GLenum name)",
          params: "name: GLU_VERSION বা GLU_EXTENSIONS",
          returns: "const GLubyte*: String",
          explanation: `GLU version ও extensions query করে।`,
          example: `printf("GLU version: %s\\n", gluGetString(GLU_VERSION));`,
        },
        {
          name: "gluNewTess / gluTessBeginPolygon / gluTessEndPolygon",
          signature: "GLUtesselator* gluNewTess()\nvoid gluTessBeginPolygon(tess, data)\nvoid gluTessEndPolygon(tess)",
          params: "tess: tessellator object",
          returns: "GLUtesselator*",
          explanation: `Complex/concave polygons কে triangles এ tessellate করার জন্য। OpenGL শুধু convex polygons directly render করতে পারে।`,
          example: `GLUtesselator* tess = gluNewTess();
gluTessCallback(tess, GLU_TESS_VERTEX, (GLvoid*) glVertex3dv);
gluTessCallback(tess, GLU_TESS_BEGIN, (GLvoid*) glBegin);
gluTessCallback(tess, GLU_TESS_END, (GLvoid*) glEnd);

gluTessBeginPolygon(tess, NULL);
    gluTessBeginContour(tess);
    // ... add vertices ...
    gluTessEndContour(tess);
gluTessEndPolygon(tess);
gluDeleteTess(tess);`,
        },
        {
          name: "gluNewNurbsRenderer / NURBS functions",
          signature: "GLUnurbs* gluNewNurbsRenderer()\nvoid gluBeginSurface(nurbs)\nvoid gluNurbsSurface(...)\nvoid gluEndSurface(nurbs)",
          params: "nurbs: NURBS renderer object",
          returns: "GLUnurbs*",
          explanation: `NURBS (Non-Uniform Rational B-Spline) curves ও surfaces render করার জন্য। Smooth curved surfaces define করতে control points ব্যবহার করে।`,
          example: `GLUnurbs* nurbs = gluNewNurbsRenderer();
gluNurbsProperty(nurbs, GLU_SAMPLING_TOLERANCE, 25.0);
gluBeginSurface(nurbs);
    gluNurbsSurface(nurbs, 8, uKnots, 8, vKnots,
        4*3, 3, ctlpoints, 4, 4, GL_MAP2_VERTEX_3);
gluEndSurface(nurbs);
gluDeleteNurbsRenderer(nurbs);`,
        },
      ]
    },
    {
      id: "gl_lighting",
      emoji: "💡",
      title: "OpenGL — Lighting & Material Functions",
      description: "Scene এ lighting setup এবং object material properties set করার functions",
      functions: [
        {
          name: "glLightfv(light, pname, params)",
          signature: "void glLightfv(GLenum light, GLenum pname, const GLfloat *params)",
          params: "light: GL_LIGHT0...GL_LIGHT7, pname: light property, params: values",
          returns: "void",
          explanation: `Light এর properties set করে। OpenGL এ maximum 8টি light (GL_LIGHT0-GL_LIGHT7)।`,
          example: `// White point light:
GLfloat lightPos[] = {5.0f, 5.0f, 5.0f, 1.0f};  // w=1: positional
GLfloat lightWhite[] = {1.0f, 1.0f, 1.0f, 1.0f};
GLfloat lightDim[] = {0.2f, 0.2f, 0.2f, 1.0f};

glLightfv(GL_LIGHT0, GL_POSITION, lightPos);
glLightfv(GL_LIGHT0, GL_DIFFUSE, lightWhite);
glLightfv(GL_LIGHT0, GL_SPECULAR, lightWhite);
glLightfv(GL_LIGHT0, GL_AMBIENT, lightDim);
glEnable(GL_LIGHT0);
glEnable(GL_LIGHTING);`,
          properties: [
            "GL_POSITION — Light position (w=1: point, w=0: directional)",
            "GL_DIFFUSE — Diffuse color",
            "GL_SPECULAR — Specular color",
            "GL_AMBIENT — Ambient color",
            "GL_SPOT_DIRECTION — Spotlight direction",
            "GL_SPOT_CUTOFF — Spotlight cone angle (0-90, 180=off)",
            "GL_SPOT_EXPONENT — Spotlight focus",
            "GL_CONSTANT_ATTENUATION — Constant attenuation factor",
            "GL_LINEAR_ATTENUATION — Linear attenuation",
            "GL_QUADRATIC_ATTENUATION — Quadratic attenuation",
          ]
        },
        {
          name: "glLightModelfv(pname, params)",
          signature: "void glLightModelfv(GLenum pname, const GLfloat *params)",
          params: "pname: model property, params: values",
          returns: "void",
          explanation: `Global lighting model properties set করে।`,
          example: `// Global ambient light:
GLfloat globalAmbient[] = {0.2f, 0.2f, 0.2f, 1.0f};
glLightModelfv(GL_LIGHT_MODEL_AMBIENT, globalAmbient);

// Two-sided lighting:
glLightModeli(GL_LIGHT_MODEL_TWO_SIDE, GL_TRUE);

// Local viewer (better specular):
glLightModeli(GL_LIGHT_MODEL_LOCAL_VIEWER, GL_TRUE);`,
        },
        {
          name: "glMaterialfv(face, pname, params)",
          signature: "void glMaterialfv(GLenum face, GLenum pname, const GLfloat *params)",
          params: "face: GL_FRONT/BACK/FRONT_AND_BACK, pname: material property",
          returns: "void",
          explanation: `Object এর material properties set করে। Light কীভাবে reflect হবে তা define করে।`,
          example: `// Shiny red material:
GLfloat matAmbient[] =  {0.2f, 0.0f, 0.0f, 1.0f};
GLfloat matDiffuse[] =  {0.8f, 0.0f, 0.0f, 1.0f};
GLfloat matSpecular[] = {1.0f, 1.0f, 1.0f, 1.0f};
GLfloat matShine[] =    {100.0f};

glMaterialfv(GL_FRONT, GL_AMBIENT, matAmbient);
glMaterialfv(GL_FRONT, GL_DIFFUSE, matDiffuse);
glMaterialfv(GL_FRONT, GL_SPECULAR, matSpecular);
glMaterialfv(GL_FRONT, GL_SHININESS, matShine);`,
          properties: [
            "GL_AMBIENT — Ambient reflectivity",
            "GL_DIFFUSE — Diffuse reflectivity",
            "GL_SPECULAR — Specular reflectivity",
            "GL_EMISSION — Emitted light color",
            "GL_SHININESS — Specular shininess (0-128)",
            "GL_AMBIENT_AND_DIFFUSE — Set both at once",
            "GL_COLOR_INDEXES — Color index mode",
          ]
        },
        {
          name: "glColorMaterial(face, mode)",
          signature: "void glColorMaterial(GLenum face, GLenum mode)",
          params: "face: GL_FRONT/BACK/FRONT_AND_BACK, mode: material property",
          returns: "void",
          explanation: `glColor() calls কে automatically material property তে map করে। glEnable(GL_COLOR_MATERIAL) সহ ব্যবহার।`,
          example: `glEnable(GL_COLOR_MATERIAL);
glColorMaterial(GL_FRONT_AND_BACK, GL_DIFFUSE);
// এখন glColor3f() calls directly material diffuse পরিবর্তন করবে
glColor3f(1, 0, 0);  // Red material
glutSolidSphere(1, 32, 32);`,
        },
        {
          name: "glShadeModel(GLenum mode)",
          signature: "void glShadeModel(GLenum mode)",
          params: "mode: GL_FLAT বা GL_SMOOTH",
          returns: "void",
          explanation: `Shading model select করে।\n\n• GL_SMOOTH (default): Gouraud shading — vertex colors এর মধ্যে interpolation\n• GL_FLAT: Flat shading — প্রতিটি polygon এর একটাই color`,
          example: `glShadeModel(GL_SMOOTH);  // Default, smooth gradients
glShadeModel(GL_FLAT);    // Faceted appearance`,
        },
      ]
    },
    {
      id: "gl_texture",
      emoji: "🖼️",
      title: "OpenGL — Texture Functions",
      description: "Texture loading, binding এবং rendering functions",
      functions: [
        {
          name: "glGenTextures(n, textures)",
          signature: "void glGenTextures(GLsizei n, GLuint *textures)",
          params: "n: কতটি texture name generate হবে, textures: output array",
          returns: "void",
          explanation: `Texture names (IDs) generate করে। Texture use করার আগে এটি call করতে হয়।`,
          example: `GLuint texID;
glGenTextures(1, &texID);  // 1টি texture ID

GLuint textures[5];
glGenTextures(5, textures);  // 5টি texture IDs`,
        },
        {
          name: "glBindTexture(target, texture)",
          signature: "void glBindTexture(GLenum target, GLuint texture)",
          params: "target: GL_TEXTURE_2D/1D/3D, texture: texture ID",
          returns: "void",
          explanation: `Texture activate করে। এরপরের texture operations এই texture এ হবে।`,
          example: `glBindTexture(GL_TEXTURE_2D, texID);  // Activate
// ... configure and use ...
glBindTexture(GL_TEXTURE_2D, 0);  // Unbind (deactivate)`,
        },
        {
          name: "glTexImage2D(...)",
          signature: "void glTexImage2D(target, level, internalFormat, width, height, border, format, type, data)",
          params: "target/level/internalFormat/width/height/border/format/type/data",
          returns: "void",
          explanation: `Texture data (pixel data) upload করে।\n\n• target: GL_TEXTURE_2D\n• level: Mipmap level (0 = base)\n• internalFormat: GPU এ কীভাবে store হবে (GL_RGB, GL_RGBA)\n• width/height: Texture size\n• border: Must be 0\n• format: Pixel data format (GL_RGB, GL_RGBA, GL_BGRA)\n• type: Pixel data type (GL_UNSIGNED_BYTE)\n• data: Pixel data pointer`,
          example: `unsigned char pixels[] = {
    255, 0, 0,    // Red
    0, 255, 0,    // Green
    0, 0, 255,    // Blue
    255, 255, 0   // Yellow
};

glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, 2, 2, 0,
    GL_RGB, GL_UNSIGNED_BYTE, pixels);`,
        },
        {
          name: "glTexSubImage2D(...)",
          signature: "void glTexSubImage2D(target, level, xoffset, yoffset, w, h, format, type, data)",
          params: "Partial texture update params",
          returns: "void",
          explanation: `Existing texture এর একটি অংশ update করে। পুরো texture re-upload না করে।`,
          example: `glTexSubImage2D(GL_TEXTURE_2D, 0, 10, 10, 50, 50,
    GL_RGB, GL_UNSIGNED_BYTE, updatedPixels);`,
        },
        {
          name: "glTexParameteri/f(target, pname, param)",
          signature: "void glTexParameteri(GLenum target, GLenum pname, GLint param)",
          params: "target, pname: parameter name, param: value",
          returns: "void",
          explanation: `Texture parameters set করে।`,
          example: `glBindTexture(GL_TEXTURE_2D, texID);

// Wrapping:
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);

// Filtering:
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);`,
          params_list: [
            "GL_TEXTURE_WRAP_S — S-axis wrapping (GL_REPEAT/CLAMP/MIRRORED_REPEAT)",
            "GL_TEXTURE_WRAP_T — T-axis wrapping",
            "GL_TEXTURE_MIN_FILTER — Minification filter",
            "GL_TEXTURE_MAG_FILTER — Magnification filter",
            "GL_TEXTURE_BORDER_COLOR — Border color",
            "GL_TEXTURE_PRIORITY — Texture priority (0-1)",
          ]
        },
        {
          name: "glTexEnvf/i(target, pname, param)",
          signature: "void glTexEnvf(GLenum target, GLenum pname, GLfloat param)",
          params: "target: GL_TEXTURE_ENV, pname/param",
          returns: "void",
          explanation: `Texture এবং fragment color কীভাবে combine হবে তা set করে।`,
          example: `glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_REPLACE);
// GL_REPLACE: Texture color শুধু
// GL_MODULATE: Texture × fragment color (default)
// GL_DECAL: Texture এর alpha দিয়ে blend
// GL_ADD: Texture + fragment color`,
        },
        {
          name: "glDeleteTextures(n, textures)",
          signature: "void glDeleteTextures(GLsizei n, const GLuint *textures)",
          params: "n: count, textures: IDs to delete",
          returns: "void",
          explanation: `Texture memory free করে।`,
          example: `glDeleteTextures(1, &texID);`,
        },
        {
          name: "glIsTexture(texture)",
          signature: "GLboolean glIsTexture(GLuint texture)",
          params: "texture: ID",
          returns: "GL_TRUE/GL_FALSE",
          explanation: `Valid texture name কিনা check করে।`,
          example: `if(glIsTexture(texID)) { ... }`,
        },
        {
          name: "glCopyTexImage2D(...)",
          signature: "void glCopyTexImage2D(target, level, internalFormat, x, y, w, h, border)",
          params: "x,y: framebuffer position, w,h: size",
          returns: "void",
          explanation: `Current frame buffer থেকে texture তৈরি করে। Render-to-texture effect এর জন্য।`,
          example: `glCopyTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, 0, 0, 512, 512, 0);`,
        },
        {
          name: "glGenerateMipmap(target) [OpenGL 3.0+]",
          signature: "void glGenerateMipmap(GLenum target)",
          params: "target: GL_TEXTURE_2D ইত্যাদি",
          returns: "void",
          explanation: `Automatically mipmap levels generate করে।`,
          example: `glBindTexture(GL_TEXTURE_2D, texID);
// Load base texture...
glGenerateMipmap(GL_TEXTURE_2D);  // Auto-generate all levels`,
        },
        {
          name: "glActiveTexture(texture) [OpenGL 1.3+]",
          signature: "void glActiveTexture(GLenum texture)",
          params: "texture: GL_TEXTURE0...GL_TEXTURE31",
          returns: "void",
          explanation: `Multi-texturing: কোন texture unit active তা select করে।`,
          example: `glActiveTexture(GL_TEXTURE0);
glBindTexture(GL_TEXTURE_2D, diffuseTexID);

glActiveTexture(GL_TEXTURE1);
glBindTexture(GL_TEXTURE_2D, normalMapID);`,
        },
      ]
    },
    {
      id: "gl_blend",
      emoji: "🌫️",
      title: "OpenGL — Blending, Fog & Special Effects",
      description: "Transparency, fog এবং visual effects functions",
      functions: [
        {
          name: "glBlendFunc(sfactor, dfactor)",
          signature: "void glBlendFunc(GLenum sfactor, GLenum dfactor)",
          params: "sfactor: Source blend factor, dfactor: Destination blend factor",
          returns: "void",
          explanation: `Alpha blending equation: Final = src * sfactor + dst * dfactor\n\nTransparency এর জন্য glEnable(GL_BLEND) করতে হবে।`,
          example: `glEnable(GL_BLEND);

// Standard transparency:
glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

// Additive blending (fire/glow effects):
glBlendFunc(GL_SRC_ALPHA, GL_ONE);

// Premultiplied alpha:
glBlendFunc(GL_ONE, GL_ONE_MINUS_SRC_ALPHA);`,
          factors: [
            "GL_ZERO — 0",
            "GL_ONE — 1",
            "GL_SRC_ALPHA — Source alpha",
            "GL_ONE_MINUS_SRC_ALPHA — 1 - src alpha",
            "GL_DST_ALPHA — Destination alpha",
            "GL_ONE_MINUS_DST_ALPHA — 1 - dst alpha",
            "GL_SRC_COLOR — Source color",
            "GL_DST_COLOR — Destination color",
          ]
        },
        {
          name: "glBlendEquation(mode) [OpenGL 1.4+]",
          signature: "void glBlendEquation(GLenum mode)",
          params: "mode: GL_FUNC_ADD/SUBTRACT/REVERSE_SUBTRACT/MIN/MAX",
          returns: "void",
          explanation: `Blending equation এর operation set করে।`,
          example: `glBlendEquation(GL_FUNC_ADD);       // Default: src+dst
glBlendEquation(GL_FUNC_SUBTRACT);  // src-dst`,
        },
        {
          name: "glAlphaFunc(func, ref)",
          signature: "void glAlphaFunc(GLenum func, GLclampf ref)",
          params: "func: Comparison function, ref: Reference value (0-1)",
          returns: "void",
          explanation: `Alpha test — নির্দিষ্ট alpha এর নিচে fragments discard করে। Texture transparency (trees/fences) এর জন্য।`,
          example: `glEnable(GL_ALPHA_TEST);
glAlphaFunc(GL_GREATER, 0.5f);  // alpha > 0.5 হলেই draw`,
          funcs: [
            "GL_NEVER — কখনো pass না",
            "GL_ALWAYS — সবসময় pass",
            "GL_LESS / GL_LEQUAL — alpha < ref",
            "GL_GREATER / GL_GEQUAL — alpha > ref",
            "GL_EQUAL / GL_NOTEQUAL",
          ]
        },
        {
          name: "glFogf / glFogi / glFogfv",
          signature: "void glFogf(GLenum pname, GLfloat param)\nvoid glFogfv(GLenum pname, const GLfloat *params)",
          params: "pname: Fog property, param/params: values",
          returns: "void",
          explanation: `Atmospheric fog effect set করে। glEnable(GL_FOG) করতে হবে।`,
          example: `glEnable(GL_FOG);
glFogi(GL_FOG_MODE, GL_LINEAR);   // Linear fog
// GL_EXP, GL_EXP2 ও available
glFogf(GL_FOG_START, 5.0f);       // Fog start distance
glFogf(GL_FOG_END, 50.0f);        // Full fog distance
GLfloat fogColor[] = {0.5f, 0.5f, 0.5f, 1.0f};
glFogfv(GL_FOG_COLOR, fogColor);  // Gray fog`,
        },
        {
          name: "glAccum(op, value)",
          signature: "void glAccum(GLenum op, GLfloat value)",
          params: "op: Operation, value: Value",
          returns: "void",
          explanation: `Accumulation buffer operations। Motion blur, depth of field, soft shadows এর জন্য।`,
          example: `// Motion blur (multiple renders):
glClear(GL_ACCUM_BUFFER_BIT);
for(int i=0; i<8; i++) {
    // render with slight time offset
    glAccum(GL_ACCUM, 1.0f/8);
}
glAccum(GL_RETURN, 1.0f);`,
          ops: [
            "GL_ACCUM — Add scaled color buffer to accum",
            "GL_LOAD — Load scaled color buffer to accum",
            "GL_ADD — Add constant to accum",
            "GL_MULT — Multiply accum by constant",
            "GL_RETURN — Transfer accum to color buffer",
          ]
        },
      ]
    },
    {
      id: "gl_depth_stencil",
      emoji: "🔬",
      title: "OpenGL — Depth, Stencil & Scissor Tests",
      description: "Fragment test functions",
      functions: [
        {
          name: "glDepthFunc(func)",
          signature: "void glDepthFunc(GLenum func)",
          params: "func: Comparison function",
          returns: "void",
          explanation: `Depth test comparison function। নতুন fragment এর depth কি existing depth buffer value এর চেয়ে কম হলে pass করবে।`,
          example: `glEnable(GL_DEPTH_TEST);
glDepthFunc(GL_LESS);    // Default - closer objects show
glDepthFunc(GL_LEQUAL);  // Less or equal
glDepthFunc(GL_ALWAYS);  // Always pass (disable depth effectively)`,
          funcs: ["GL_NEVER", "GL_LESS (default)", "GL_EQUAL", "GL_LEQUAL", "GL_GREATER", "GL_NOTEQUAL", "GL_GEQUAL", "GL_ALWAYS"]
        },
        {
          name: "glDepthMask(flag)",
          signature: "void glDepthMask(GLboolean flag)",
          params: "flag: GL_TRUE/GL_FALSE",
          returns: "void",
          explanation: `Depth buffer write enable/disable। Transparent objects draw করার সময় depth write disable করতে হয়।`,
          example: `// Transparent objects:
glDepthMask(GL_FALSE);   // Don't write to depth
// draw transparent things
glDepthMask(GL_TRUE);    // Re-enable`,
        },
        {
          name: "glStencilFunc(func, ref, mask)",
          signature: "void glStencilFunc(GLenum func, GLint ref, GLuint mask)",
          params: "func: Comparison, ref: Reference value, mask: AND mask",
          returns: "void",
          explanation: `Stencil test setup। Masking effects, portal rendering, shadow volumes এর জন্য।`,
          example: `glEnable(GL_STENCIL_TEST);
// Write 1 to stencil where we draw:
glStencilFunc(GL_ALWAYS, 1, 0xFF);
glStencilOp(GL_KEEP, GL_KEEP, GL_REPLACE);
drawMask();

// Only draw where stencil == 1:
glStencilFunc(GL_EQUAL, 1, 0xFF);
glStencilOp(GL_KEEP, GL_KEEP, GL_KEEP);
drawReflection();`,
        },
        {
          name: "glStencilOp(fail, zfail, zpass)",
          signature: "void glStencilOp(GLenum fail, GLenum zfail, GLenum zpass)",
          params: "fail: stencil fail action, zfail: depth fail, zpass: both pass",
          returns: "void",
          explanation: `Stencil buffer update actions।`,
          example: `glStencilOp(GL_KEEP, GL_KEEP, GL_REPLACE);`,
          actions: ["GL_KEEP — No change", "GL_ZERO — Set to 0", "GL_REPLACE — Set to ref", "GL_INCR — Increment", "GL_DECR — Decrement", "GL_INVERT — Bitwise invert"]
        },
        {
          name: "glStencilMask(mask)",
          signature: "void glStencilMask(GLuint mask)",
          params: "mask: Write mask",
          returns: "void",
          explanation: `Stencil buffer write mask।`,
          example: `glStencilMask(0xFF);  // Enable all writes
glStencilMask(0x00);  // Disable all writes`,
        },
        {
          name: "glScissor(x, y, w, h)",
          signature: "void glScissor(GLint x, GLint y, GLsizei width, GLsizei height)",
          params: "x, y: Bottom-left, w, h: Scissor box size",
          returns: "void",
          explanation: `নির্দিষ্ট rectangular region এর বাইরে কোনো drawing হবে না। glEnable(GL_SCISSOR_TEST) করতে হবে।`,
          example: `glEnable(GL_SCISSOR_TEST);
glScissor(100, 100, 400, 300);  // Only draw in this box
glClear(GL_COLOR_BUFFER_BIT);   // Only clears scissor area
// draw...
glDisable(GL_SCISSOR_TEST);`,
        },
      ]
    },
    {
      id: "gl_display_lists",
      emoji: "📝",
      title: "OpenGL — Display Lists",
      description: "Pre-compiled rendering commands store করার functions",
      functions: [
        {
          name: "glGenLists(range)",
          signature: "GLuint glGenLists(GLsizei range)",
          params: "range: কতটি contiguous list IDs generate করবে",
          returns: "GLuint: First list ID",
          explanation: `Display list IDs allocate করে। Display lists হলো pre-compiled OpenGL commands যা repeated drawing কে faster করে।`,
          example: `GLuint listID = glGenLists(1);  // 1টি list
GLuint listBase = glGenLists(26); // 26টি (font এর জন্য)`,
        },
        {
          name: "glNewList(list, mode) / glEndList()",
          signature: "void glNewList(GLuint list, GLenum mode)\nvoid glEndList()",
          params: "list: list ID, mode: GL_COMPILE বা GL_COMPILE_AND_EXECUTE",
          returns: "void",
          explanation: `Display list recording শুরু/শেষ করে।\n\n• GL_COMPILE: শুধু store করে, execute করে না\n• GL_COMPILE_AND_EXECUTE: Store করে এবং এখনই execute করে`,
          example: `glNewList(listID, GL_COMPILE);
    glColor3f(1, 0, 0);
    glutSolidSphere(1.0, 32, 32);
glEndList();

// Later, use it:
glCallList(listID);`,
        },
        {
          name: "glCallList(list) / glCallLists(n, type, lists)",
          signature: "void glCallList(GLuint list)\nvoid glCallLists(GLsizei n, GLenum type, const void *lists)",
          params: "list: list ID, n: count, type: GL_UNSIGNED_BYTE ইত্যাদি",
          returns: "void",
          explanation: `Display list execute করে।\n\nglCallLists: একাধিক lists execute করে — font rendering এ useful।`,
          example: `// Single list:
glCallList(sphereList);

// Font rendering:
glListBase(fontBase);  // Base offset
glCallLists(strlen(text), GL_UNSIGNED_BYTE, text);`,
        },
        {
          name: "glDeleteLists(list, range)",
          signature: "void glDeleteLists(GLuint list, GLsizei range)",
          params: "list: first ID, range: count",
          returns: "void",
          explanation: `Display lists delete করে।`,
          example: `glDeleteLists(listID, 1);
glDeleteLists(fontBase, 256);`,
        },
        {
          name: "glIsList(list)",
          signature: "GLboolean glIsList(GLuint list)",
          params: "list: ID",
          returns: "GL_TRUE/GL_FALSE",
          explanation: `Valid display list কিনা check করে।`,
          example: `if(glIsList(listID)) { glCallList(listID); }`,
        },
        {
          name: "glListBase(base)",
          signature: "void glListBase(GLuint base)",
          params: "base: Base offset for glCallLists",
          returns: "void",
          explanation: `glCallLists এর base offset set করে।`,
          example: `glListBase(fontBase - 32);  // ASCII offset`,
        },
      ]
    },
    {
      id: "gl_vbo",
      emoji: "⚡",
      title: "OpenGL — Vertex Arrays & Buffer Objects (VBO)",
      description: "Modern/Efficient geometry rendering — Vertex Arrays, VBO, VAO",
      functions: [
        {
          name: "glVertexPointer / glColorPointer / glNormalPointer / glTexCoordPointer",
          signature: "void glVertexPointer(GLint size, GLenum type, GLsizei stride, const void *ptr)",
          params: "size: components per vertex, type: data type, stride: byte offset between vertices, ptr: data pointer",
          returns: "void",
          explanation: `Vertex array setup করে। glBegin/glEnd এর চেয়ে অনেক বেশি efficient।`,
          example: `float vertices[] = {
    0.0f, 0.5f, 0.0f,    // Vertex 1
   -0.5f, -0.5f, 0.0f,   // Vertex 2
    0.5f, -0.5f, 0.0f    // Vertex 3
};

glEnableClientState(GL_VERTEX_ARRAY);
glVertexPointer(3, GL_FLOAT, 0, vertices);
glDrawArrays(GL_TRIANGLES, 0, 3);
glDisableClientState(GL_VERTEX_ARRAY);`,
        },
        {
          name: "glEnableClientState / glDisableClientState",
          signature: "void glEnableClientState(GLenum array)\nvoid glDisableClientState(GLenum array)",
          params: "array: GL_VERTEX_ARRAY, GL_COLOR_ARRAY, GL_NORMAL_ARRAY, GL_TEXTURE_COORD_ARRAY",
          returns: "void",
          explanation: `Client-side (CPU) vertex arrays enable/disable করে।`,
          example: `glEnableClientState(GL_VERTEX_ARRAY);
glEnableClientState(GL_COLOR_ARRAY);
glEnableClientState(GL_NORMAL_ARRAY);
// ... draw ...
glDisableClientState(GL_COLOR_ARRAY);
glDisableClientState(GL_VERTEX_ARRAY);`,
        },
        {
          name: "glDrawArrays(mode, first, count)",
          signature: "void glDrawArrays(GLenum mode, GLint first, GLsizei count)",
          params: "mode: Primitive type, first: Starting index, count: Vertex count",
          returns: "void",
          explanation: `Vertex array থেকে directly draw করে। Indexed না।`,
          example: `glDrawArrays(GL_TRIANGLES, 0, 3);         // 1 triangle
glDrawArrays(GL_TRIANGLE_STRIP, 0, 6);   // Triangle strip`,
        },
        {
          name: "glDrawElements(mode, count, type, indices)",
          signature: "void glDrawElements(GLenum mode, GLsizei count, GLenum type, const void *indices)",
          params: "mode: Primitive, count: index count, type: index data type, indices: index array",
          returns: "void",
          explanation: `Index array ব্যবহার করে draw করে। Vertex reuse করা যায় — VBO এর সাথে খুবই efficient।`,
          example: `float verts[] = { /* 4 vertices */ };
unsigned int indices[] = {0,1,2, 2,3,0};  // 2 triangles sharing vertices

glVertexPointer(3, GL_FLOAT, 0, verts);
glEnableClientState(GL_VERTEX_ARRAY);
glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, indices);`,
        },
        {
          name: "glGenBuffers / glBindBuffer / glBufferData (VBO)",
          signature: "void glGenBuffers(GLsizei n, GLuint *buffers)\nvoid glBindBuffer(GLenum target, GLuint buffer)\nvoid glBufferData(GLenum target, GLsizeiptr size, const void *data, GLenum usage)",
          params: "n/buffers: count and IDs; target: GL_ARRAY_BUFFER/ELEMENT_ARRAY_BUFFER; size/data/usage",
          returns: "void",
          explanation: `VBO (Vertex Buffer Object) — GPU memory তে vertex data store করে। Fastest rendering method।\n\nusage hints:\n• GL_STATIC_DRAW: একবার set, বহুবার draw\n• GL_DYNAMIC_DRAW: বারবার update\n• GL_STREAM_DRAW: প্রতিবার নতুন data`,
          example: `GLuint vbo;
glGenBuffers(1, &vbo);
glBindBuffer(GL_ARRAY_BUFFER, vbo);
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices),
    vertices, GL_STATIC_DRAW);

// Draw:
glBindBuffer(GL_ARRAY_BUFFER, vbo);
glVertexPointer(3, GL_FLOAT, 0, 0);  // offset 0
glEnableClientState(GL_VERTEX_ARRAY);
glDrawArrays(GL_TRIANGLES, 0, 3);

// Cleanup:
glDeleteBuffers(1, &vbo);`,
        },
        {
          name: "glGenVertexArrays / glBindVertexArray (VAO) [OpenGL 3.0+]",
          signature: "void glGenVertexArrays(GLsizei n, GLuint *arrays)\nvoid glBindVertexArray(GLuint array)",
          params: "n/arrays: count and IDs; array: VAO ID",
          returns: "void",
          explanation: `VAO (Vertex Array Object) — সব vertex attribute state save করে। Modern OpenGL এ standard approach।`,
          example: `GLuint vao;
glGenVertexArrays(1, &vao);
glBindVertexArray(vao);
    // Setup VBOs and attributes once
    glBindBuffer(GL_ARRAY_BUFFER, vbo);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0);
    glEnableVertexAttribArray(0);
glBindVertexArray(0);  // Unbind

// Draw: just bind VAO
glBindVertexArray(vao);
glDrawArrays(GL_TRIANGLES, 0, 3);`,
        },
        {
          name: "glVertexAttribPointer [Modern OpenGL]",
          signature: "void glVertexAttribPointer(GLuint index, GLint size, GLenum type, GLboolean normalized, GLsizei stride, const void *offset)",
          params: "index: attribute location, size: components, type, normalized, stride, offset",
          returns: "void",
          explanation: `Modern OpenGL (shader-based) এ vertex attributes define করে।`,
          example: `// Layout: 3 floats position, 2 floats texcoord
// Stride = 5 * sizeof(float)
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 5*sizeof(float), (void*)0);
glEnableVertexAttribArray(0);
glVertexAttribPointer(1, 2, GL_FLOAT, GL_FALSE, 5*sizeof(float), (void*)(3*sizeof(float)));
glEnableVertexAttribArray(1);`,
        },
      ]
    },
    {
      id: "gl_shader",
      emoji: "🔧",
      title: "OpenGL — Shaders (GLSL) [Modern OpenGL 2.0+]",
      description: "Programmable shader pipeline functions",
      functions: [
        {
          name: "glCreateShader / glShaderSource / glCompileShader",
          signature: "GLuint glCreateShader(GLenum type)\nvoid glShaderSource(GLuint shader, GLsizei count, const char** string, const GLint* length)\nvoid glCompileShader(GLuint shader)",
          params: "type: GL_VERTEX_SHADER/GL_FRAGMENT_SHADER; source code string",
          returns: "GLuint: shader ID",
          explanation: `Shader program তৈরি করে।\n\n• glCreateShader: Shader object তৈরি\n• glShaderSource: GLSL source code set\n• glCompileShader: Compile করো`,
          example: `const char* vertSrc = 
    "#version 330 core\\n"
    "layout(location=0) in vec3 pos;\\n"
    "void main() { gl_Position = vec4(pos, 1.0); }";

GLuint vert = glCreateShader(GL_VERTEX_SHADER);
glShaderSource(vert, 1, &vertSrc, NULL);
glCompileShader(vert);

// Check errors:
GLint success;
glGetShaderiv(vert, GL_COMPILE_STATUS, &success);
if(!success) {
    char log[512];
    glGetShaderInfoLog(vert, 512, NULL, log);
    fprintf(stderr, "Shader error: %s\\n", log);
}`,
        },
        {
          name: "glCreateProgram / glAttachShader / glLinkProgram / glUseProgram",
          signature: "GLuint glCreateProgram()\nvoid glAttachShader(GLuint prog, GLuint shader)\nvoid glLinkProgram(GLuint prog)\nvoid glUseProgram(GLuint prog)",
          params: "prog: program ID, shader: shader ID",
          returns: "void / GLuint",
          explanation: `Shader program link করে এবং use করে।`,
          example: `GLuint prog = glCreateProgram();
glAttachShader(prog, vertShader);
glAttachShader(prog, fragShader);
glLinkProgram(prog);

// Check link errors:
GLint success;
glGetProgramiv(prog, GL_LINK_STATUS, &success);

// Use it:
glUseProgram(prog);

// Cleanup shaders (no longer needed after linking):
glDeleteShader(vertShader);
glDeleteShader(fragShader);`,
        },
        {
          name: "glGetUniformLocation / glUniform*",
          signature: "GLint glGetUniformLocation(GLuint prog, const char* name)\nvoid glUniform1f(GLint loc, GLfloat v)",
          params: "prog: program, name: uniform variable name; v: value",
          returns: "GLint: location (-1 if not found)",
          explanation: `Shader এ uniform variables set করে।\n\nVariants: glUniform1f/2f/3f/4f/1i/2i/3i/4i/Matrix4fv ইত্যাদি`,
          example: `GLint colorLoc = glGetUniformLocation(prog, "myColor");
glUniform4f(colorLoc, 1.0f, 0.0f, 0.0f, 1.0f);

// Matrix:
GLint mvpLoc = glGetUniformLocation(prog, "MVP");
glUniformMatrix4fv(mvpLoc, 1, GL_FALSE, mvpMatrix);`,
        },
        {
          name: "glDeleteShader / glDeleteProgram",
          signature: "void glDeleteShader(GLuint shader)\nvoid glDeleteProgram(GLuint program)",
          params: "shader/program: IDs",
          returns: "void",
          explanation: `Shader এবং program objects delete করে।`,
          example: `glDeleteShader(vertShader);
glDeleteProgram(shaderProgram);`,
        },
      ]
    },
    {
      id: "gl_fbo",
      emoji: "🎯",
      title: "OpenGL — Framebuffer Objects (FBO) [OpenGL 3.0+]",
      description: "Off-screen rendering, render-to-texture",
      functions: [
        {
          name: "glGenFramebuffers / glBindFramebuffer",
          signature: "void glGenFramebuffers(GLsizei n, GLuint *ids)\nvoid glBindFramebuffer(GLenum target, GLuint framebuffer)",
          params: "n: count, ids: output; target: GL_FRAMEBUFFER",
          returns: "void",
          explanation: `Framebuffer Object তৈরি এবং bind করে। Off-screen rendering এর জন্য।`,
          example: `GLuint fbo;
glGenFramebuffers(1, &fbo);
glBindFramebuffer(GL_FRAMEBUFFER, fbo);

// Attach texture:
glFramebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0,
    GL_TEXTURE_2D, colorTexture, 0);

// Check status:
if(glCheckFramebufferStatus(GL_FRAMEBUFFER) == GL_FRAMEBUFFER_COMPLETE) {
    // Ready to render
}

// Back to default:
glBindFramebuffer(GL_FRAMEBUFFER, 0);`,
        },
        {
          name: "glFramebufferTexture2D",
          signature: "void glFramebufferTexture2D(target, attachment, textarget, texture, level)",
          params: "attachment: GL_COLOR_ATTACHMENT0, GL_DEPTH_ATTACHMENT ইত্যাদি",
          returns: "void",
          explanation: `Texture কে framebuffer attachment হিসেবে attach করে।`,
          example: `glFramebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0,
    GL_TEXTURE_2D, colorTex, 0);
glFramebufferTexture2D(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT,
    GL_TEXTURE_2D, depthTex, 0);`,
        },
        {
          name: "glGenRenderbuffers / glBindRenderbuffer / glRenderbufferStorage",
          signature: "void glGenRenderbuffers(n, ids)\nvoid glBindRenderbuffer(target, rb)\nvoid glRenderbufferStorage(target, internalformat, w, h)",
          params: "internalformat: GL_DEPTH24_STENCIL8 ইত্যাদি",
          returns: "void",
          explanation: `Renderbuffer — texture এর চেয়ে fast কিন্তু sampling করা যায় না। Depth/stencil attachment এর জন্য।`,
          example: `GLuint rbo;
glGenRenderbuffers(1, &rbo);
glBindRenderbuffer(GL_RENDERBUFFER, rbo);
glRenderbufferStorage(GL_RENDERBUFFER, GL_DEPTH24_STENCIL8, 800, 600);
glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_STENCIL_ATTACHMENT,
    GL_RENDERBUFFER, rbo);`,
        },
        {
          name: "glCheckFramebufferStatus",
          signature: "GLenum glCheckFramebufferStatus(GLenum target)",
          params: "target: GL_FRAMEBUFFER",
          returns: "GLenum: status",
          explanation: `Framebuffer complete কিনা check করে।`,
          example: `GLenum status = glCheckFramebufferStatus(GL_FRAMEBUFFER);
if(status != GL_FRAMEBUFFER_COMPLETE)
    fprintf(stderr, "FBO Error: %x\\n", status);`,
        },
        {
          name: "glDeleteFramebuffers / glDeleteRenderbuffers",
          signature: "void glDeleteFramebuffers(n, ids)\nvoid glDeleteRenderbuffers(n, ids)",
          params: "n: count, ids",
          returns: "void",
          explanation: `FBO এবং RBO cleanup।`,
          example: `glDeleteFramebuffers(1, &fbo);
glDeleteRenderbuffers(1, &rbo);`,
        },
      ]
    },
    {
      id: "gl_misc",
      emoji: "🔩",
      title: "OpenGL — Miscellaneous Functions",
      description: "Error handling, pixel operations এবং অন্যান্য functions",
      functions: [
        {
          name: "glGetError()",
          signature: "GLenum glGetError()",
          params: "কোনো parameter নেই",
          returns: "GLenum: Error code",
          explanation: `Most recent OpenGL error retrieve করে এবং error flag clear করে।`,
          example: `void checkGLError(const char* location) {
    GLenum err = glGetError();
    while(err != GL_NO_ERROR) {
        printf("GL Error at %s: %s\\n",
            location, gluErrorString(err));
        err = glGetError();
    }
}
checkGLError("after draw");`,
          errors: [
            "GL_NO_ERROR — কোনো error নেই",
            "GL_INVALID_ENUM — Invalid enum argument",
            "GL_INVALID_VALUE — Out of range value",
            "GL_INVALID_OPERATION — Invalid operation",
            "GL_STACK_OVERFLOW — Matrix stack overflow",
            "GL_STACK_UNDERFLOW — Matrix stack underflow",
            "GL_OUT_OF_MEMORY — Out of memory",
          ]
        },
        {
          name: "glFlush() / glFinish()",
          signature: "void glFlush()\nvoid glFinish()",
          params: "কোনো parameter নেই",
          returns: "void",
          explanation: `glFlush(): Buffered commands execute করার request পাঠায়। Non-blocking।\nglFinish(): সব commands complete না হওয়া পর্যন্ত block করে। Synchronization এর জন্য।`,
          example: `// Single buffer mode এ:
glFlush();

// Profiling বা sync এর জন্য:
glFinish();`,
        },
        {
          name: "glReadPixels(x, y, w, h, format, type, pixels)",
          signature: "void glReadPixels(GLint x, y, GLsizei w, h, GLenum format, type, void *pixels)",
          params: "x,y: bottom-left, w,h: size, format/type, pixels: output buffer",
          returns: "void",
          explanation: `Framebuffer থেকে pixel data পড়ে। Screenshot, picking, GPU ↔ CPU data transfer।`,
          example: `unsigned char* buffer = malloc(width * height * 3);
glReadPixels(0, 0, width, height,
    GL_RGB, GL_UNSIGNED_BYTE, buffer);
// Save as image...
free(buffer);`,
          note: "glReadPixels খুবই slow — GPU pipeline stall হয়। Production এ PBO ব্যবহার করুন।"
        },
        {
          name: "glDrawPixels(w, h, format, type, pixels)",
          signature: "void glDrawPixels(GLsizei w, h, GLenum format, type, const void *pixels)",
          params: "w,h: image size, format/type, pixels: image data",
          returns: "void",
          explanation: `CPU buffer থেকে pixel data directly framebuffer এ লেখে। Slow কিন্তু simple।`,
          example: `glRasterPos2f(-1, -1);  // Bottom-left
glDrawPixels(imgW, imgH, GL_RGB, GL_UNSIGNED_BYTE, imageData);`,
        },
        {
          name: "glCopyPixels(x, y, w, h, type)",
          signature: "void glCopyPixels(GLint x, y, GLsizei w, h, GLenum type)",
          params: "x,y: source, w,h: size, type: GL_COLOR/DEPTH/STENCIL",
          returns: "void",
          explanation: `Framebuffer এর একটি অংশ copy করে current raster position এ।`,
          example: `glCopyPixels(0, 0, 100, 100, GL_COLOR);`,
        },
        {
          name: "glPixelStorei/f(pname, param)",
          signature: "void glPixelStorei(GLenum pname, GLint param)",
          params: "pname: storage mode, param: value",
          returns: "void",
          explanation: `Pixel data alignment এবং packing/unpacking rules set করে।`,
          example: `glPixelStorei(GL_UNPACK_ALIGNMENT, 1);  // 1-byte alignment
// Useful for odd-width textures
glPixelStorei(GL_PACK_ALIGNMENT, 4);    // Default 4-byte`,
        },
        {
          name: "glMapBuffer / glUnmapBuffer [OpenGL 1.5+]",
          signature: "void* glMapBuffer(GLenum target, GLenum access)\nGLboolean glUnmapBuffer(GLenum target)",
          params: "target: GL_ARRAY_BUFFER ইত্যাদি, access: GL_READ_ONLY/WRITE_ONLY/READ_WRITE",
          returns: "void*: pointer to buffer data",
          explanation: `VBO data directly CPU থেকে access করার জন্য।`,
          example: `glBindBuffer(GL_ARRAY_BUFFER, vbo);
float* data = (float*)glMapBuffer(GL_ARRAY_BUFFER, GL_WRITE_ONLY);
// Modify data directly
data[0] = newX; data[1] = newY;
glUnmapBuffer(GL_ARRAY_BUFFER);`,
        },
        {
          name: "glBufferSubData(target, offset, size, data)",
          signature: "void glBufferSubData(GLenum target, GLintptr offset, GLsizeiptr size, const void *data)",
          params: "offset: byte offset, size: bytes to update, data: new data",
          returns: "void",
          explanation: `VBO এর একটি অংশ update করে। glBufferData এর চেয়ে efficient (পুরো re-upload না করে)।`,
          example: `glBindBuffer(GL_ARRAY_BUFFER, vbo);
glBufferSubData(GL_ARRAY_BUFFER, 0, sizeof(newData), newData);`,
        },
        {
          name: "glLogicOp(opcode)",
          signature: "void glLogicOp(GLenum opcode)",
          params: "opcode: GL_COPY, GL_XOR, GL_AND ইত্যাদি",
          returns: "void",
          explanation: `Pixel logical operations। glEnable(GL_COLOR_LOGIC_OP) সহ ব্যবহার।`,
          example: `glEnable(GL_COLOR_LOGIC_OP);
glLogicOp(GL_XOR);  // XOR drawing (rubber band selection)`,
        },
        {
          name: "glSelectBuffer / glFeedbackBuffer / glRenderMode",
          signature: "void glSelectBuffer(GLsizei size, GLuint *buffer)\nvoid glFeedbackBuffer(GLsizei size, GLenum type, GLfloat *buffer)\nGLint glRenderMode(GLenum mode)",
          params: "size: buffer size; mode: GL_RENDER/SELECT/FEEDBACK",
          returns: "GLint: count in selection/feedback mode",
          explanation: `Legacy selection এবং feedback modes।\n\n• GL_RENDER: Normal rendering\n• GL_SELECT: Object picking (hit testing)\n• GL_FEEDBACK: Get primitive data back`,
          example: `GLuint selectBuf[512];
glSelectBuffer(512, selectBuf);
glRenderMode(GL_SELECT);
glInitNames();
// ... render with name stack ...
GLint hits = glRenderMode(GL_RENDER);  // Back to normal, get hit count`,
        },
        {
          name: "glInitNames / glPushName / glPopName / glLoadName",
          signature: "void glInitNames()\nvoid glPushName(GLuint name)\nvoid glPopName()\nvoid glLoadName(GLuint name)",
          params: "name: Object identifier",
          returns: "void",
          explanation: `Legacy selection mode এ object naming।`,
          example: `glInitNames();
glPushName(0);
for(int i=0; i<numObjects; i++) {
    glLoadName(i);
    drawObject(i);
}`,
        },
        {
          name: "glEvalMesh1 / glEvalMesh2 (Evaluators)",
          signature: "void glEvalMesh1(GLenum mode, GLint i1, GLint i2)\nvoid glEvalMesh2(GLenum mode, GLint i1, i2, j1, j2)",
          params: "mode: GL_POINT/LINE/FILL",
          returns: "void",
          explanation: `Polynomial evaluator curves ও surfaces render করে। Bezier curves/surfaces generate করতে।`,
          example: `// 1D Bezier:
glMap1f(GL_MAP1_VERTEX_3, 0, 1, 3, 4, controlPoints);
glEnable(GL_MAP1_VERTEX_3);
glMapGrid1f(30, 0.0f, 1.0f);  // 30 segments
glEvalMesh1(GL_LINE, 0, 30);`,
        },
      ]
    },
    {
      id: "gl_freeglut_extra",
      emoji: "🆕",
      title: "FreeGLUT — Extra Functions (GLUT extension)",
      description: "FreeGLUT এর নিজস্ব additional functions",
      functions: [
        {
          name: "glutSetOption(option, value)",
          signature: "void glutSetOption(GLenum option, int value)",
          params: "option: GLUT_ACTION_ON_WINDOW_CLOSE ইত্যাদি, value",
          returns: "void",
          explanation: `FreeGLUT specific options set করে।`,
          example: `// Window close করলে program exit হবে না, loop continue করবে:
glutSetOption(GLUT_ACTION_ON_WINDOW_CLOSE,
    GLUT_ACTION_GLUTMAINLOOP_RETURNS);`,
        },
        {
          name: "glutGetProcAddress(proc)",
          signature: "void* glutGetProcAddress(const char *procName)",
          params: "procName: OpenGL extension function name",
          returns: "void*: function pointer",
          explanation: `OpenGL extension functions এর function pointer পাওয়ার জন্য।`,
          example: `// Get VBO extension:
PFNGLGENBUFFERSPROC glGenBuffers =
    (PFNGLGENBUFFERSPROC)glutGetProcAddress("glGenBuffers");`,
          note: "GLEW library ব্যবহার করলে এটির দরকার নেই।"
        },
        {
          name: "glutMouseWheelFunc(func) [FreeGLUT]",
          signature: "void glutMouseWheelFunc(void (*func)(int wheel, int dir, int x, int y))",
          params: "wheel: 0, dir: +1 or -1, x/y: position",
          returns: "void",
          explanation: `Mouse scroll wheel callback। FreeGLUT specific।`,
          example: `void mouseWheel(int wheel, int dir, int x, int y) {
    zoom += dir * 0.1f;
    glutPostRedisplay();
}
glutMouseWheelFunc(mouseWheel);`,
        },
        {
          name: "glutWarpPointer(x, y)",
          signature: "void glutWarpPointer(int x, int y)",
          params: "x, y: New mouse position",
          returns: "void",
          explanation: `Mouse cursor কে নির্দিষ্ট position এ move করে।`,
          example: `// FPS camera - keep mouse in center:
glutWarpPointer(windowW/2, windowH/2);`,
        },
        {
          name: "glutSetCursor(cursor)",
          signature: "void glutSetCursor(int cursor)",
          params: "cursor: GLUT_CURSOR_* constant",
          returns: "void",
          explanation: `Mouse cursor shape পরিবর্তন করে।`,
          example: `glutSetCursor(GLUT_CURSOR_CROSSHAIR);
glutSetCursor(GLUT_CURSOR_NONE);  // FPS mode
glutSetCursor(GLUT_CURSOR_INHERIT);  // Default`,
          cursors: [
            "GLUT_CURSOR_RIGHT_ARROW — Default arrow",
            "GLUT_CURSOR_LEFT_ARROW",
            "GLUT_CURSOR_INFO — Hand/pointer",
            "GLUT_CURSOR_CROSSHAIR",
            "GLUT_CURSOR_NONE — Invisible",
            "GLUT_CURSOR_WAIT — Hourglass/spinner",
            "GLUT_CURSOR_TEXT — Text I-beam",
          ]
        },
        {
          name: "glutVideoResize functions",
          signature: "void glutVideoResizeGet(info)\nvoid glutSetupVideoResizing()\nvoid glutStopVideoResizing()\nvoid glutVideoResize(x, y, w, h)\nvoid glutVideoPan(x, y, w, h)",
          params: "Various video resize parameters",
          returns: "Various",
          explanation: `Video resize এবং pan করার জন্য (specialized hardware)।`,
          example: `// Specialized use case`,
        },
        {
          name: "glutReportErrors() [FreeGLUT]",
          signature: "void glutReportErrors()",
          params: "none",
          returns: "void",
          explanation: `OpenGL errors report করে।`,
          example: `glutReportErrors();`,
        },
        {
          name: "glutIgnoreKeyRepeat(ignore) [FreeGLUT]",
          signature: "void glutIgnoreKeyRepeat(int ignore)",
          params: "ignore: 1 = ignore, 0 = don't ignore",
          returns: "void",
          explanation: `Key held down এ auto-repeat ignore করে।`,
          example: `glutIgnoreKeyRepeat(1);  // Only first press matters`,
        },
      ]
    },
  ],

  codeExamples: [
    {
      title: "🌟 Complete Minimal OpenGL Program",
      code: `#include <GL/glut.h>

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    
    glBegin(GL_TRIANGLES);
        glColor3f(1,0,0); glVertex2f( 0.0f,  0.5f);
        glColor3f(0,1,0); glVertex2f(-0.5f, -0.5f);
        glColor3f(0,0,1); glVertex2f( 0.5f, -0.5f);
    glEnd();
    
    glutSwapBuffers();
}

void reshape(int w, int h) {
    glViewport(0, 0, w, h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(-1, 1, -1, 1);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
}

void keyboard(unsigned char key, int x, int y) {
    if(key == 27) exit(0); // ESC
}

int main(int argc, char **argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB);
    glutInitWindowSize(600, 600);
    glutInitWindowPosition(100, 100);
    glutCreateWindow("Hello OpenGL!");
    
    glClearColor(0.1f, 0.1f, 0.1f, 1.0f);
    
    glutDisplayFunc(display);
    glutReshapeFunc(reshape);
    glutKeyboardFunc(keyboard);
    
    glutMainLoop();
    return 0;
}`,
    },
    {
      title: "🎬 3D Rotating Cube with Lighting",
      code: `#include <GL/glut.h>

float angle = 0.0f;

void setupLighting() {
    GLfloat lightPos[] = {5,5,5,1};
    GLfloat white[] = {1,1,1,1};
    GLfloat dim[] = {0.2f,0.2f,0.2f,1};
    
    glLightfv(GL_LIGHT0, GL_POSITION, lightPos);
    glLightfv(GL_LIGHT0, GL_DIFFUSE, white);
    glLightfv(GL_LIGHT0, GL_SPECULAR, white);
    glLightfv(GL_LIGHT0, GL_AMBIENT, dim);
    
    glEnable(GL_LIGHTING);
    glEnable(GL_LIGHT0);
    glEnable(GL_DEPTH_TEST);
    glEnable(GL_NORMALIZE);
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    glLoadIdentity();
    
    gluLookAt(0,0,5, 0,0,0, 0,1,0);
    
    GLfloat matDiff[] = {0.8f,0.2f,0.2f,1};
    GLfloat matSpec[] = {1,1,1,1};
    GLfloat shine[] = {80.0f};
    glMaterialfv(GL_FRONT, GL_DIFFUSE, matDiff);
    glMaterialfv(GL_FRONT, GL_SPECULAR, matSpec);
    glMaterialfv(GL_FRONT, GL_SHININESS, shine);
    
    glRotatef(angle, 1,1,0);
    glutSolidCube(2.0);
    
    glutSwapBuffers();
}

void timer(int val) {
    angle += 1.5f;
    if(angle > 360) angle -= 360;
    glutPostRedisplay();
    glutTimerFunc(16, timer, 0);
}

void reshape(int w, int h) {
    glViewport(0,0,w,h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(45, (double)w/h, 0.1, 100);
    glMatrixMode(GL_MODELVIEW);
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE|GLUT_RGB|GLUT_DEPTH);
    glutInitWindowSize(800,600);
    glutCreateWindow("3D Rotating Cube");
    
    glClearColor(0.05f, 0.05f, 0.1f, 1);
    setupLighting();
    
    glutDisplayFunc(display);
    glutReshapeFunc(reshape);
    glutTimerFunc(16, timer, 0);
    
    glutMainLoop();
}`,
    },
    {
      title: "🖱️ Interactive Drawing App",
      code: `#include <GL/glut.h>
#include <vector>

struct Point { float x, y, r, g, b; };
std::vector<Point> points;
float cr=1,cg=0,cb=0;  // Current color

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    glPointSize(8.0f);
    glBegin(GL_POINTS);
    for(auto& p : points) {
        glColor3f(p.r, p.g, p.b);
        glVertex2f(p.x, p.y);
    }
    glEnd();
    glutSwapBuffers();
}

float screenToWorld(int pixel, int size) {
    return (pixel / (float)size) * 2 - 1;
}

void mouse(int btn, int state, int x, int y) {
    if(btn == GLUT_LEFT_BUTTON && state == GLUT_DOWN) {
        int w = glutGet(GLUT_WINDOW_WIDTH);
        int h = glutGet(GLUT_WINDOW_HEIGHT);
        Point p;
        p.x = screenToWorld(x, w);
        p.y = -screenToWorld(y, h);
        p.r = cr; p.g = cg; p.b = cb;
        points.push_back(p);
        glutPostRedisplay();
    }
}

void motion(int x, int y) {
    int w = glutGet(GLUT_WINDOW_WIDTH);
    int h = glutGet(GLUT_WINDOW_HEIGHT);
    Point p;
    p.x = screenToWorld(x, w);
    p.y = -screenToWorld(y, h);
    p.r = cr; p.g = cg; p.b = cb;
    points.push_back(p);
    glutPostRedisplay();
}

void menu(int val) {
    if(val==1) { cr=1;cg=0;cb=0; }  // Red
    if(val==2) { cr=0;cg=1;cb=0; }  // Green
    if(val==3) { cr=0;cg=0;cb=1; }  // Blue
    if(val==4) points.clear();       // Clear
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE|GLUT_RGB);
    glutInitWindowSize(800,600);
    glutCreateWindow("Paint App");
    
    glClearColor(1,1,1,1);
    
    int m = glutCreateMenu(menu);
    glutAddMenuEntry("Red", 1);
    glutAddMenuEntry("Green", 2);
    glutAddMenuEntry("Blue", 3);
    glutAddMenuEntry("Clear", 4);
    glutAttachMenu(GLUT_RIGHT_BUTTON);
    
    glutDisplayFunc(display);
    glutMouseFunc(mouse);
    glutMotionFunc(motion);
    
    glutMainLoop();
}`,
    },
  ]
};

const COLORS = {
  bg: "#0a0f1e",
  surface: "#111827",
  surfaceHover: "#1a2436",
  border: "#1e2d45",
  accent: "#00d4ff",
  accent2: "#7c3aed",
  accent3: "#10b981",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  code: "#1e1b4b",
  codeText: "#a5f3fc",
};

function Tag({ children, color }) {
  return (
    <span style={{
      background: color || "#1e2d45",
      color: COLORS.accent,
      fontSize: "0.7rem",
      padding: "2px 8px",
      borderRadius: "4px",
      fontFamily: "monospace",
      border: `1px solid ${COLORS.border}`,
    }}>{children}</span>
  );
}

function FunctionCard({ fn }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderRadius: "8px",
      border: `1px solid ${open ? COLORS.accent : COLORS.border}`,
      marginBottom: "8px",
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          background: open ? "#0d1f35" : COLORS.surface,
          border: "none",
          color: COLORS.text,
          padding: "12px 16px",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "background 0.2s",
        }}
      >
        <span style={{ color: COLORS.accent, fontSize: "1rem", minWidth: 16 }}>{open ? "▼" : "▶"}</span>
        <code style={{ color: COLORS.codeText, fontSize: "0.85rem", fontWeight: "bold" }}>{fn.name || fn.signature?.split("(")[0] || "Function"}</code>
      </button>
      {open && (
        <div style={{ background: "#080e1a", padding: "16px", borderTop: `1px solid ${COLORS.border}` }}>
          {fn.signature && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: "0.75rem", color: COLORS.textMuted, marginBottom: 4 }}>Signature</div>
              <pre style={{ background: COLORS.code, color: "#c7d2fe", padding: "10px", borderRadius: "6px", fontSize: "0.8rem", overflowX: "auto", margin: 0 }}>
                {fn.signature}
              </pre>
            </div>
          )}
          {fn.params && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: "0.75rem", color: COLORS.textMuted, marginBottom: 4 }}>Parameters</div>
              <div style={{ color: "#fde68a", fontSize: "0.82rem", lineHeight: 1.6 }}>{fn.params}</div>
            </div>
          )}
          {fn.returns && (
            <div style={{ marginBottom: 12 }}>
              <Tag>Returns</Tag>{" "}
              <span style={{ color: "#86efac", fontSize: "0.82rem" }}>{fn.returns}</span>
            </div>
          )}
          {fn.explanation && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: "0.75rem", color: COLORS.textMuted, marginBottom: 6 }}>Explanation</div>
              <div style={{ color: COLORS.text, fontSize: "0.85rem", lineHeight: 1.7, whiteSpace: "pre-line" }}>{fn.explanation}</div>
            </div>
          )}
          {fn.example && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: "0.75rem", color: COLORS.textMuted, marginBottom: 6 }}>Example Code</div>
              <pre style={{ background: COLORS.code, color: "#a5f3fc", padding: "12px", borderRadius: "6px", fontSize: "0.8rem", overflowX: "auto", margin: 0, lineHeight: 1.6 }}>
                {fn.example}
              </pre>
            </div>
          )}
          {fn.note && (
            <div style={{ background: "#1a1a2e", border: "1px solid #7c3aed", borderRadius: "6px", padding: "10px 14px", fontSize: "0.82rem", color: "#c4b5fd" }}>
              💡 {fn.note}
            </div>
          )}
          {(fn.flags || fn.modes || fn.states || fn.fonts || fn.keys || fn.masks || fn.actions || fn.errors || fn.factors || fn.cursors || fn.ops || fn.funcs || fn.properties || fn.params_list) && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: "0.75rem", color: COLORS.textMuted, marginBottom: 6 }}>Values / Options</div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {(fn.flags || fn.modes || fn.states || fn.fonts || fn.keys || fn.masks || fn.actions || fn.errors || fn.factors || fn.cursors || fn.ops || fn.funcs || fn.properties || fn.params_list || []).map((f, i) => (
                  <li key={i} style={{ color: "#86efac", fontSize: "0.8rem", marginBottom: 4 }}>
                    <code>{f}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CategorySection({ cat }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 16, borderRadius: 10, border: `1px solid ${open ? COLORS.accent2 : COLORS.border}`, overflow: "hidden" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: open ? "#130d2a" : COLORS.surface, border: "none",
          color: COLORS.text, padding: "16px 20px", textAlign: "left", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 12,
        }}
      >
        <span style={{ fontSize: "1.4rem" }}>{cat.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "bold", fontSize: "1rem", color: "#e9d5ff" }}>{cat.title}</div>
          <div style={{ fontSize: "0.78rem", color: COLORS.textMuted, marginTop: 2 }}>{cat.description}</div>
        </div>
        <span style={{ color: COLORS.accent2, fontSize: "0.9rem", background: "#1e1b4b", padding: "2px 10px", borderRadius: 20 }}>
          {cat.functions.length} functions {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div style={{ padding: "16px", background: "#0a0f1e" }}>
          {cat.functions.map((fn, i) => <FunctionCard key={i} fn={fn} />)}
        </div>
      )}
    </div>
  );
}

function TopicCard({ topic }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 8, borderRadius: 8, border: `1px solid ${open ? COLORS.accent3 : COLORS.border}`, overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", background: open ? "#041f17" : COLORS.surface, border: "none",
        color: COLORS.text, padding: "11px 16px", textAlign: "left", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ color: COLORS.accent3 }}>{open ? "▼" : "▶"}</span>
        <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{topic.name}</span>
      </button>
      {open && (
        <div style={{ padding: "14px 16px", background: "#040e0a", color: COLORS.text, fontSize: "0.85rem", lineHeight: 1.8, whiteSpace: "pre-line", borderTop: `1px solid ${COLORS.border}` }}>
          {topic.explanation}
        </div>
      )}
    </div>
  );
}

function CGSection({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 12, borderRadius: 10, border: `1px solid ${open ? COLORS.accent3 : COLORS.border}`, overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", background: open ? "#041f17" : COLORS.surface, border: "none",
        color: COLORS.text, padding: "14px 18px", textAlign: "left", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontWeight: "bold", fontSize: "1rem", flex: 1 }}>{section.title}</span>
        <span style={{ color: COLORS.accent3, fontSize: "0.8rem" }}>{section.topics.length} topics {open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ padding: "14px", background: "#040e0a" }}>
          {section.topics.map((t, i) => <TopicCard key={i} topic={t} />)}
        </div>
      )}
    </div>
  );
}

function CodeExample({ example }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 12, borderRadius: 10, border: `1px solid ${open ? "#f59e0b" : COLORS.border}`, overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", background: open ? "#1c1200" : COLORS.surface, border: "none",
        color: COLORS.text, padding: "14px 18px", textAlign: "left", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontWeight: "bold", flex: 1 }}>{example.title}</span>
        <span style={{ color: "#f59e0b", fontSize: "0.8rem" }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <pre style={{ background: "#0d0900", color: "#fde68a", padding: "18px", margin: 0, fontSize: "0.8rem", overflowX: "auto", lineHeight: 1.7 }}>
          {example.code}
        </pre>
      )}
    </div>
  );
}

const TABS = [
  { id: "intro", label: "📖 Intro" },
  { id: "cg", label: "📐 CG Concepts" },
  { id: "functions", label: "⚡ All Functions" },
  { id: "examples", label: "💻 Code Examples" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0a0f1e 0%, #13072e 50%, #021224 100%)",
        borderBottom: `2px solid ${COLORS.accent}`,
        padding: "24px 28px",
      }}>
        <div style={{ fontSize: "0.75rem", color: COLORS.accent, letterSpacing: 3, marginBottom: 6, textTransform: "uppercase" }}>Complete Tutorial</div>
        <h1 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, background: "linear-gradient(90deg, #00d4ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Computer Graphics with OpenGL
        </h1>
        <div style={{ color: COLORS.textMuted, fontSize: "0.85rem", marginTop: 6 }}>
          OpenGL + GLUT + FreeGLUT — সম্পূর্ণ বাংলা রেফারেন্স গাইড
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, padding: "12px 16px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface, overflowX: "auto" }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", whiteSpace: "nowrap",
            background: activeTab === tab.id ? "linear-gradient(135deg, #00d4ff22, #7c3aed22)" : "transparent",
            color: activeTab === tab.id ? COLORS.accent : COLORS.textMuted,
            borderBottom: activeTab === tab.id ? `2px solid ${COLORS.accent}` : "2px solid transparent",
            fontWeight: activeTab === tab.id ? "bold" : "normal",
            fontSize: "0.88rem",
            transition: "all 0.2s",
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        {activeTab === "intro" && (
          <div>
            <div style={{ background: COLORS.surface, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
              <h2 style={{ margin: "0 0 16px", color: COLORS.accent }}>{data.intro.title}</h2>
              <p style={{ color: "#c084fc", margin: "0 0 16px", fontSize: "0.95rem" }}>{data.intro.subtitle}</p>
              <div style={{ color: COLORS.text, lineHeight: 1.9, whiteSpace: "pre-line", fontSize: "0.88rem" }}>{data.intro.overview}</div>
            </div>
            <div style={{ background: COLORS.surface, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
              <h3 style={{ margin: "0 0 14px", color: COLORS.accent3 }}>🗂️ Tutorial Structure</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                {[
                  "📐 CG Fundamentals", "📦 Primitives & Drawing", "🔄 Transformations",
                  "💡 Lighting & Shading", "🖼️ Texturing", "🎬 Animation",
                  "🚀 GLUT Init Functions", "🔁 Main Loop & Events", "📞 All Callbacks",
                  "🪟 Window Management", "📋 Menu System", "🔤 Font Rendering",
                  "🔷 3D Shapes", "⚙️ GL State Management", "🧹 Clear & Color",
                  "✏️ Drawing Geometry", "🔢 Matrix Transforms", "🔮 GLU Library",
                  "💡 Lighting API", "🖼️ Texture API", "🌫️ Blending & Effects",
                  "🔬 Tests (Depth/Stencil)", "📝 Display Lists", "⚡ VBO/VAO",
                  "🔧 Shaders (GLSL)", "🎯 Framebuffer (FBO)", "🔩 Error & Misc",
                  "🕹️ Joystick/Devices", "🆕 FreeGLUT Extras", "💻 Code Examples",
                ].map((item, i) => (
                  <div key={i} style={{ background: "#0d1a2e", padding: "8px 12px", borderRadius: 8, fontSize: "0.82rem", color: COLORS.text, border: `1px solid ${COLORS.border}` }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#0d1a00", borderRadius: 12, padding: 20, border: "1px solid #166534" }}>
              <h3 style={{ margin: "0 0 12px", color: "#86efac" }}>⚙️ Setup Guide</h3>
              <div style={{ color: COLORS.text, fontSize: "0.85rem", lineHeight: 1.8 }}>
                <strong style={{ color: "#4ade80" }}>Windows (MinGW):</strong><br/>
                <code style={{ color: "#a5f3fc" }}>gcc main.c -o app -lGL -lGLU -lglut</code><br/><br/>
                <strong style={{ color: "#4ade80" }}>Linux:</strong><br/>
                <code style={{ color: "#a5f3fc" }}>sudo apt install freeglut3-dev<br/>gcc main.c -o app -lGL -lGLU -lglut</code><br/><br/>
                <strong style={{ color: "#4ade80" }}>macOS:</strong><br/>
                <code style={{ color: "#a5f3fc" }}>gcc main.c -framework OpenGL -framework GLUT -o app</code><br/><br/>
                <strong style={{ color: "#4ade80" }}>Code::Blocks / VS:</strong><br/>
                Project → Link → Add: opengl32, glu32, freeglut
              </div>
            </div>
          </div>
        )}

        {activeTab === "cg" && (
          <div>
            <div style={{ background: COLORS.surface, borderRadius: 10, padding: "14px 18px", marginBottom: 20, border: `1px solid ${COLORS.border}` }}>
              <p style={{ margin: 0, color: COLORS.textMuted, fontSize: "0.85rem" }}>
                Computer Graphics এর fundamental concepts। প্রতিটি section click করলে expand হবে।
              </p>
            </div>
            {data.cgTopics.map((section, i) => <CGSection key={i} section={section} />)}
          </div>
        )}

        {activeTab === "functions" && (
          <div>
            <div style={{ background: COLORS.surface, borderRadius: 10, padding: "14px 18px", marginBottom: 20, border: `1px solid ${COLORS.border}` }}>
              <p style={{ margin: 0, color: COLORS.textMuted, fontSize: "0.85rem" }}>
                সব functions category-wise। Category click করে expand করো, তারপর function click করে details দেখো।
              </p>
            </div>
            {data.categories.map((cat, i) => <CategorySection key={i} cat={cat} />)}
          </div>
        )}

        {activeTab === "examples" && (
          <div>
            <div style={{ background: COLORS.surface, borderRadius: 10, padding: "14px 18px", marginBottom: 20, border: `1px solid ${COLORS.border}` }}>
              <p style={{ margin: 0, color: COLORS.textMuted, fontSize: "0.85rem" }}>
                Complete working code examples। Title click করলে code দেখাবে।
              </p>
            </div>
            {data.codeExamples.map((ex, i) => <CodeExample key={i} example={ex} />)}
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", padding: "20px", borderTop: `1px solid ${COLORS.border}`, color: COLORS.textMuted, fontSize: "0.78rem" }}>
        OpenGL + GLUT/FreeGLUT Complete Tutorial — Computer Graphics Reference
      </div>
    </div>
  );
}
