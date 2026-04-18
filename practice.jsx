import { useState } from "react";

const problems = [
  // ── SECTION 1: Numbers & Math ──
  {
    id: 1,
    section: "Numbers & Math",
    title: "Sum of Digits",
    difficulty: "Easy",
    concept: "Loops + Arithmetic",
    problem: "Given an integer N, find the sum of all its digits.",
    example: "Input: 1234 → Output: 10  (1+2+3+4)",
    hint: "Convert to string and iterate, or use modulo (%) and floor division (//).",
  },
  {
    id: 2,
    section: "Numbers & Math",
    title: "Palindrome Number",
    difficulty: "Easy",
    concept: "String / Arithmetic",
    problem: "Check if a number reads the same forwards and backwards.",
    example: "Input: 121 → Output: Yes\nInput: 123 → Output: No",
    hint: "Reverse the digits (string slice [::-1] or math) and compare.",
  },
  {
    id: 3,
    section: "Numbers & Math",
    title: "Prime Check",
    difficulty: "Easy",
    concept: "Loops + Conditionals",
    problem: "Given N, print 'Prime' if it is a prime number, otherwise 'Not Prime'.",
    example: "Input: 7 → Output: Prime\nInput: 9 → Output: Not Prime",
    hint: "Only check divisors up to √N (use N**0.5).",
  },
  {
    id: 4,
    section: "Numbers & Math",
    title: "Factorial",
    difficulty: "Easy",
    concept: "Loops / Recursion",
    problem: "Compute N! (factorial of N). Solve it both iteratively and recursively.",
    example: "Input: 5 → Output: 120",
    hint: "Recursive: fact(n) = n * fact(n-1), base case fact(0) = 1.",
  },
  {
    id: 5,
    section: "Numbers & Math",
    title: "GCD & LCM",
    difficulty: "Easy",
    concept: "Euclidean Algorithm",
    problem: "Given two integers A and B, find their GCD and LCM without any library.",
    example: "Input: 12 18 → GCD: 6, LCM: 36",
    hint: "GCD(a,b) = GCD(b, a%b). LCM = (a*b) // GCD(a,b).",
  },
  {
    id: 6,
    section: "Numbers & Math",
    title: "Count Even & Odd",
    difficulty: "Easy",
    concept: "Conditionals + Loops",
    problem: "Given N numbers, count how many are even and how many are odd.",
    example: "Input: 1 2 3 4 5 → Even: 2, Odd: 3",
    hint: "Use n % 2 == 0 to test evenness.",
  },

  // ── SECTION 2: Strings ──
  {
    id: 7,
    section: "Strings",
    title: "Reverse a String",
    difficulty: "Easy",
    concept: "String Slicing",
    problem: "Reverse a given string without using any built-in reverse function.",
    example: "Input: 'hello' → Output: 'olleh'",
    hint: "Use a loop or slicing s[::-1].",
  },
  {
    id: 8,
    section: "Strings",
    title: "Count Vowels & Consonants",
    difficulty: "Easy",
    concept: "String Iteration",
    problem: "Count the number of vowels and consonants in a given string (ignore spaces and digits).",
    example: "Input: 'Hello World' → Vowels: 3, Consonants: 7",
    hint: "Check each character with `if c in 'aeiouAEIOU'`.",
  },
  {
    id: 9,
    section: "Strings",
    title: "Anagram Check",
    difficulty: "Easy",
    concept: "Sorting / Dict",
    problem: "Given two strings, check if they are anagrams of each other.",
    example: "Input: 'listen' 'silent' → Output: Yes",
    hint: "Sort both strings and compare, or count character frequencies with a dict.",
  },
  {
    id: 10,
    section: "Strings",
    title: "Caesar Cipher",
    difficulty: "Medium",
    concept: "String + ord/chr",
    problem: "Encrypt a lowercase string using Caesar Cipher with a given shift K. Only shift alphabet characters.",
    example: "Input: 'abc' K=3 → Output: 'def'\nInput: 'xyz' K=3 → Output: 'abc'",
    hint: "Use ord() and chr(). Wrap around with % 26.",
  },
  {
    id: 11,
    section: "Strings",
    title: "Word Frequency",
    difficulty: "Medium",
    concept: "Dict + String Split",
    problem: "Given a sentence, count how many times each word appears. Print in any order.",
    example: "Input: 'the cat sat on the mat' → the:2, cat:1, sat:1, on:1, mat:1",
    hint: "Split the string, then use a dictionary to count.",
  },
  {
    id: 12,
    section: "Strings",
    title: "Longest Word",
    difficulty: "Easy",
    concept: "String + max logic",
    problem: "Find the longest word in a sentence. If tie, return the first one.",
    example: "Input: 'I love competitive programming' → Output: 'competitive'",
    hint: "Split and track max length word using a loop.",
  },

  // ── SECTION 3: Lists ──
  {
    id: 13,
    section: "Lists",
    title: "Second Largest",
    difficulty: "Easy",
    concept: "List Traversal",
    problem: "Find the second largest distinct element in a list.",
    example: "Input: [3, 1, 4, 1, 5, 9, 2, 6] → Output: 6",
    hint: "Sort and pick, or do it in one pass with two variables (max1, max2).",
  },
  {
    id: 14,
    section: "Lists",
    title: "Rotate a List",
    difficulty: "Easy",
    concept: "List Slicing",
    problem: "Rotate a list to the right by K positions.",
    example: "Input: [1,2,3,4,5] K=2 → Output: [4,5,1,2,3]",
    hint: "Use slicing: lst[-K:] + lst[:-K].",
  },
  {
    id: 15,
    section: "Lists",
    title: "Remove Duplicates",
    difficulty: "Easy",
    concept: "Set / List",
    problem: "Remove duplicates from a list while preserving the original order.",
    example: "Input: [1,2,2,3,4,3,5] → Output: [1,2,3,4,5]",
    hint: "Use a set to track seen elements, build a new list.",
  },
  {
    id: 16,
    section: "Lists",
    title: "Flatten Nested List",
    difficulty: "Medium",
    concept: "Nested Loops",
    problem: "Given a list of lists, flatten it into a single list.",
    example: "Input: [[1,2],[3,4],[5]] → Output: [1,2,3,4,5]",
    hint: "Loop over the outer list, then over each inner list.",
  },
  {
    id: 17,
    section: "Lists",
    title: "Two Sum",
    difficulty: "Medium",
    concept: "Dict / Brute Force",
    problem: "Given a list of integers and a target T, find two indices such that the numbers at those indices add up to T.",
    example: "Input: [2,7,11,15] T=9 → Output: [0,1]",
    hint: "Brute force O(n²) or use a dict for O(n).",
  },

  // ── SECTION 4: Tuples & Sets ──
  {
    id: 18,
    section: "Tuples & Sets",
    title: "Tuple Unpacking Swap",
    difficulty: "Easy",
    concept: "Tuples",
    problem: "Swap two variables using tuple unpacking (no temp variable).",
    example: "a=5, b=3 → After swap: a=3, b=5",
    hint: "a, b = b, a — that's it! Understand why this works.",
  },
  {
    id: 19,
    section: "Tuples & Sets",
    title: "Common Elements",
    difficulty: "Easy",
    concept: "Set Intersection",
    problem: "Given two lists, find all elements that appear in both (no duplicates in output).",
    example: "Input: [1,2,3,4] [3,4,5,6] → Output: {3,4}",
    hint: "Convert both to sets and use & or .intersection().",
  },
  {
    id: 20,
    section: "Tuples & Sets",
    title: "Unique Elements Only",
    difficulty: "Easy",
    concept: "Set Symmetric Diff",
    problem: "Given two lists A and B, find elements that are in A or B but NOT in both.",
    example: "Input: [1,2,3] [2,3,4] → Output: {1,4}",
    hint: "Use set symmetric difference: A ^ B.",
  },

  // ── SECTION 5: Dictionaries ──
  {
    id: 21,
    section: "Dictionaries",
    title: "Phone Book",
    difficulty: "Easy",
    concept: "Dict CRUD",
    problem: "Build a simple phone book: support add, delete, and search by name. Run in a loop until user types 'exit'.",
    example: "add Alice 12345 → OK\nsearch Alice → 12345\ndelete Alice → OK",
    hint: "Use a dict. Handle KeyError for missing names.",
  },
  {
    id: 22,
    section: "Dictionaries",
    title: "Most Frequent Element",
    difficulty: "Easy",
    concept: "Dict Counting",
    problem: "Find the element that appears most frequently in a list. If tie, return any one.",
    example: "Input: [1,3,2,1,4,1,3] → Output: 1",
    hint: "Count with a dict, then find max by value.",
  },
  {
    id: 23,
    section: "Dictionaries",
    title: "Group Anagrams",
    difficulty: "Medium",
    concept: "Dict + Sorting",
    problem: "Given a list of words, group them by anagram families.",
    example: "Input: ['eat','tea','tan','ate','nat','bat']\nOutput: [['eat','tea','ate'],['tan','nat'],['bat']]",
    hint: "Use sorted(word) as a dict key.",
  },

  // ── SECTION 6: Functions & Logic ──
  {
    id: 24,
    section: "Functions & Logic",
    title: "FizzBuzz",
    difficulty: "Easy",
    concept: "Conditionals + Modulo",
    problem: "Print numbers 1–N. For multiples of 3 print 'Fizz', multiples of 5 print 'Buzz', both print 'FizzBuzz'.",
    example: "N=15 → 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz",
    hint: "Check divisibility by 15 first, then 3, then 5.",
  },
  {
    id: 25,
    section: "Functions & Logic",
    title: "Number to Words",
    difficulty: "Medium",
    concept: "Dict + Logic",
    problem: "Convert a number 1–99 into English words.",
    example: "Input: 42 → Output: forty two\nInput: 17 → Output: seventeen",
    hint: "Use two dicts: one for units/teens, one for tens.",
  },
  {
    id: 26,
    section: "Functions & Logic",
    title: "Pascal's Triangle",
    difficulty: "Medium",
    concept: "Nested Lists + Logic",
    problem: "Print the first N rows of Pascal's Triangle.",
    example: "N=4:\n1\n1 1\n1 2 1\n1 3 3 1",
    hint: "Each row: first & last are 1; middle elements = sum of two above.",
  },
  {
    id: 27,
    section: "Functions & Logic",
    title: "Armstrong Numbers",
    difficulty: "Easy",
    concept: "Math + Loops",
    problem: "Print all Armstrong numbers up to N. (An Armstrong number = sum of its digits each raised to the power of number of digits.)",
    example: "153 = 1³+5³+3³ = 153 ✓",
    hint: "Find digit count with len(str(n)), then compute digit-wise power sum.",
  },

  // ── SECTION 7: Classic Algorithms (Pure Python) ──
  {
    id: 28,
    section: "Classic Algorithms",
    title: "Binary Search",
    difficulty: "Medium",
    concept: "Divide & Conquer",
    problem: "Given a SORTED list and a target T, find its index using binary search. Return -1 if not found.",
    example: "Input: [1,3,5,7,9,11] T=7 → Output: 3",
    hint: "Keep low and high pointers. mid = (low+high)//2.",
  },
  {
    id: 29,
    section: "Classic Algorithms",
    title: "Bubble Sort",
    difficulty: "Medium",
    concept: "Nested Loops + Swap",
    problem: "Sort a list using Bubble Sort (implement it yourself, don't use .sort()).",
    example: "Input: [5,3,1,4,2] → Output: [1,2,3,4,5]",
    hint: "Repeatedly swap adjacent elements if they are in wrong order. Add an 'optimized' flag to stop early.",
  },
  {
    id: 30,
    section: "Classic Algorithms",
    title: "Matrix Multiplication",
    difficulty: "Hard",
    concept: "Nested Loops + Lists",
    problem: "Given two 2D matrices A (m×n) and B (n×p), compute their product C (m×p) without any library.",
    example: "A=[[1,2],[3,4]] B=[[5,6],[7,8]] → C=[[19,22],[43,50]]",
    hint: "Three nested loops: i over rows of A, j over columns of B, k over shared dimension.",
  },
];

const sections = [...new Set(problems.map((p) => p.section))];

const diffColor = {
  Easy: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
  Medium: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  Hard: { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
};

const sectionIcon = {
  "Numbers & Math": "🔢",
  Strings: "🔤",
  Lists: "📋",
  "Tuples & Sets": "🔗",
  Dictionaries: "📖",
  "Functions & Logic": "⚙️",
  "Classic Algorithms": "🏆",
};

export default function App() {
  const [activeSection, setActiveSection] = useState("All");
  const [expanded, setExpanded] = useState({});
  const [solved, setSolved] = useState({});

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));
  const toggleSolved = (id, e) => {
    e.stopPropagation();
    setSolved((p) => ({ ...p, [id]: !p[id] }));
  };

  const filtered =
    activeSection === "All"
      ? problems
      : problems.filter((p) => p.section === activeSection);

  const solvedCount = Object.values(solved).filter(Boolean).length;

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#0f0f23", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a3e 0%, #0f0f23 100%)",
        borderBottom: "1px solid #2d2d5e",
        padding: "32px 24px 24px",
        textAlign: "center",
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ fontSize: 13, letterSpacing: "4px", color: "#818cf8", textTransform: "uppercase", marginBottom: 8 }}>
          Competitive Programming Prep
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(22px, 5vw, 36px)", fontWeight: 900, color: "#f1f5f9", letterSpacing: "-1px" }}>
          30 Python Problems
        </h1>
        <p style={{ margin: "8px 0 0", color: "#94a3b8", fontSize: 14 }}>
          Pure Python · No Libraries · Beginner Competitive Programming
        </p>

        {/* Progress */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ background: "#1e1e4a", borderRadius: 99, height: 8, width: 200, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 99,
              width: `${(solvedCount / 30) * 100}%`,
              background: "linear-gradient(90deg, #818cf8, #a78bfa)",
              transition: "width 0.4s ease"
            }} />
          </div>
          <span style={{ color: "#a78bfa", fontFamily: "monospace", fontWeight: 700, fontSize: 14 }}>
            {solvedCount}/30
          </span>
        </div>
      </div>

      {/* Section Tabs */}
      <div style={{ padding: "16px 16px 0", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 8, minWidth: "max-content", margin: "0 auto", maxWidth: 860 }}>
          {["All", ...sections].map((s) => (
            <button key={s} onClick={() => setActiveSection(s)}
              style={{
                padding: "7px 14px", borderRadius: 99, border: "1px solid",
                borderColor: activeSection === s ? "#818cf8" : "#2d2d5e",
                background: activeSection === s ? "#818cf8" : "transparent",
                color: activeSection === s ? "#fff" : "#94a3b8",
                fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                whiteSpace: "nowrap", transition: "all 0.2s", fontWeight: activeSection === s ? 700 : 400
              }}>
              {s === "All" ? "📚 All" : `${sectionIcon[s]} ${s}`}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Cards */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "16px 16px 48px" }}>
        {filtered.map((p) => {
          const dc = diffColor[p.difficulty];
          const isOpen = expanded[p.id];
          const isSolved = solved[p.id];

          return (
            <div key={p.id}
              onClick={() => toggle(p.id)}
              style={{
                background: isSolved ? "#0d1f0d" : "#13132e",
                border: `1px solid ${isSolved ? "#16a34a" : "#2d2d5e"}`,
                borderRadius: 12,
                marginBottom: 10,
                cursor: "pointer",
                transition: "all 0.2s",
                overflow: "hidden",
                boxShadow: isOpen ? "0 4px 24px rgba(129,140,248,0.1)" : "none"
              }}>

              {/* Card Header */}
              <div style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 12 }}>
                {/* Solved checkbox */}
                <div onClick={(e) => toggleSolved(p.id, e)}
                  style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    border: `2px solid ${isSolved ? "#16a34a" : "#3d3d6e"}`,
                    background: isSolved ? "#16a34a" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", cursor: "pointer"
                  }}>
                  {isSolved && <span style={{ color: "#fff", fontSize: 13 }}>✓</span>}
                </div>

                {/* Number */}
                <span style={{
                  fontFamily: "monospace", fontSize: 12, color: "#4a4a8a",
                  fontWeight: 700, minWidth: 24
                }}>#{p.id}</span>

                {/* Title */}
                <span style={{
                  flex: 1, fontWeight: 700, fontSize: 15,
                  color: isSolved ? "#86efac" : "#e2e8f0",
                  textDecoration: isSolved ? "line-through" : "none"
                }}>{p.title}</span>

                {/* Concept tag */}
                <span style={{
                  fontSize: 11, color: "#818cf8", background: "#1e1e4a",
                  padding: "2px 8px", borderRadius: 99, display: "none",
                  fontFamily: "monospace"
                }} className="concept-tag">{p.concept}</span>

                {/* Difficulty */}
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "3px 10px",
                  borderRadius: 99, flexShrink: 0,
                  background: dc.bg, color: dc.text, border: `1px solid ${dc.border}`
                }}>{p.difficulty}</span>

                {/* Section icon */}
                <span style={{ fontSize: 16, flexShrink: 0 }}>{sectionIcon[p.section]}</span>

                {/* Chevron */}
                <span style={{
                  color: "#4a4a8a", fontSize: 12, transition: "transform 0.2s",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                }}>▼</span>
              </div>

              {/* Expanded Body */}
              {isOpen && (
                <div style={{ padding: "0 16px 16px", borderTop: "1px solid #1e1e4a" }}>
                  <div style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>

                    {/* Concept */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: "#818cf8", fontFamily: "monospace",
                        background: "#1e1e4a", padding: "2px 10px", borderRadius: 99, fontWeight: 700 }}>
                        🧠 {p.concept}
                      </span>
                      <span style={{ fontSize: 11, color: "#4a4a8a" }}>{p.section}</span>
                    </div>

                    {/* Problem */}
                    <div style={{ background: "#0d0d20", borderRadius: 8, padding: 14, borderLeft: "3px solid #818cf8" }}>
                      <div style={{ fontSize: 11, color: "#818cf8", fontWeight: 700, marginBottom: 6, letterSpacing: "1px" }}>PROBLEM</div>
                      <p style={{ margin: 0, fontSize: 14, color: "#e2e8f0", lineHeight: 1.7 }}>{p.problem}</p>
                    </div>

                    {/* Example */}
                    <div style={{ background: "#0a1628", borderRadius: 8, padding: 14, borderLeft: "3px solid #38bdf8" }}>
                      <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 700, marginBottom: 6, letterSpacing: "1px" }}>EXAMPLE</div>
                      <pre style={{ margin: 0, fontSize: 13, color: "#7dd3fc", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
                        {p.example}
                      </pre>
                    </div>

                    {/* Hint */}
                    <div style={{ background: "#1a0f0a", borderRadius: 8, padding: 14, borderLeft: "3px solid #fb923c" }}>
                      <div style={{ fontSize: 11, color: "#fb923c", fontWeight: 700, marginBottom: 6, letterSpacing: "1px" }}>💡 HINT</div>
                      <p style={{ margin: 0, fontSize: 13, color: "#fed7aa", fontFamily: "monospace", lineHeight: 1.6 }}>{p.hint}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", paddingBottom: 32, color: "#3d3d6e", fontSize: 12 }}>
        Click any card to expand · Check the box when solved
      </div>
    </div>
  );
}
