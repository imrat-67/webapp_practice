<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$cppFile = "a.cpp";         // Source file
$exeFile = "/tmp/a.out";    // Compiled output file
$outputFile = "output.txt"; // Output storage

// Compile the C++ file
$compileCommand = "g++ $cppFile -o $exeFile 2>&1";
$compileOutput = shell_exec($compileCommand);

// Check for compilation errors
if (!file_exists($exeFile)) {
    echo json_encode([
        "success" => false,
        "error" => "Compilation failed",
        "details" => $compileOutput
    ]);
    exit;
}

// Execute the compiled file and save output
$runCommand = "$exeFile > $outputFile 2>&1";
shell_exec($runCommand);

// Read the output
$output = file_get_contents($outputFile);
$solveValue = trim($output); // Ensure clean output

echo json_encode([
    "success" => true,
    "solve" => $solveValue
]);
?>
