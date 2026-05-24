<?php

// One line comment
# Also one line comment
/*
Multi
Line 
Comment
*/



// INDEXED ARRAY
$cars = ["Volvo", "BMW", "Toyota"];
echo $cars[0]; // Outputs: Volvo

// ASSOCIATIVE ARRAY
$carDetails = [
    "brand" => "Ford",
    "model" => "Mustang",
    "year" => 1964
];
echo $carDetails["brand"]; // Outputs: Ford


$cars = ["Volvo", "BMW", "Toyota"];
// Adds Škoda to the 3rd index because arrays start from 0
$cars[] = "Škoda";
echo $cars[3]; // Outputs: Škoda


$cars = ["Volvo", "BMW", "Toyota"];
// Adds Škoda to the 0th index
array_unshift($cars, "Škoda");
echo $cars[0]; // Outputs: Škoda





$cars = ["Volvo", "BMW", "Toyota"];
// Removes first item from an array
array_shift($cars);
echo $cars[0];
// Outputs: BMW because Volvo is no longer in the array


$cars = ["Volvo", "BMW", "Toyota"];
// Removes last item from an array
array_pop($cars);
echo $cars[2];
// Wont work because there is nothing on 2nd index



$role = "admin";
switch ($role) {
    case "admin": // Checks if $role is "admin"
        echo "Full access.";
        break; // Stop here, don't check other cases!
    case "editor": // Checks if $role is "editor"
        echo "Edit access.";
        break;
    default: // Runs if $role is neither admin nor editor
        echo "Access denied.";
}


// Initialization, Condition, Increment
for ($i = 0; $i < 3; $i++) {
    // $i starts at 0 and stops when it reaches 3
    echo "This is iteration number " . $i . "<br>";
}

$cars = ["Volvo", "BMW", "Toyota"];
// "as" assigns each item to the variable $car
foreach ($cars as $car) {
    // This runs once for every item in the array
    echo $car . "<br>"; 
}


$count = 1;
// Keep running while count is less than 3
while ($count < 3) {
    echo "Count is " . $count . "<br>";
    $count++; // Must increase the counter or it loops forever!
}



$count = 5;
// Code runs first, checks condition later
do {
    echo "This prints once, even though the condition is false!";
} while ($count < 3); 
// Condition is false, so it stops here and doesn't loop again


// The Blueprint
class Car {
    public $brand;
    public $color;
}

// The Real Objects
$myCar = new Car(); 
$yourCar = new Car();



class Car {
    public $brand;
    public $color;
    // Runs automatically when 'new Car' is typed
    public function __construct($b, $c) {
        $this->brand = $b;
        $this->color = $c;
    }
}
// We pass the data straight into the blueprint
$myCar = new Car("Ford", "Red");
echo "I drive a " . $myCar->color . " " . $myCar->brand; 
// Outputs: I drive a Red Ford



class Car {
    // This is a single method
    public function honk() {
        echo "Beep beep!";
    }
}
$myCar = new Car();
// Calling the method
$myCar->honk(); 
// Outputs: Beep beep!




class User {
    public $name = "John";
    private $password = "123456";
}

$player = new User();
// This works perfectly because it is public
echo $player->name; 
// This will throw an ERROR because it is private!
echo $player->password; 





// PHP tries to load the file, but keeps going if it fails
include "footer.php";
// PHP must load this file. If it fails, everything stops!
require "database.php";
// PHP must load this file, but only if it has not been loaded yet
require_once "functions.php";




// Always start the session first
session_start();
// Saving data into the session array
$_SESSION["username"] = "JohnDoe";
$_SESSION["role"] = "admin";



session_start();
// Reading data on a different page
echo "Welcome back " . $_SESSION["username"];
// Removes only the username variable
unset($_SESSION["username"]);
// Clear all remaining variables from the array
session_unset();
// Completely destroy the session on the server
session_destroy();


// Set up the database details
$dsn = "mysql:host=localhost;dbname=my_site";
// Create the connection object
$pdo = new PDO($dsn, "root", "password");
// Running a simple SQL command directly
$pdo->query("DELETE FROM logs WHERE id = 1");



$input = $_POST["email"];
// INCORRECT and highly dangerous way
// Hackers can inject malicious SQL commands right into this string
$sql = "SELECT * FROM users WHERE email = '$input'";
$pdo->query($sql);



// Use :email as a blank placeholder
$sql = "SELECT * FROM users WHERE email = :email";
$stmt = $pdo->prepare($sql);
// Send the data as a separate step
$stmt->execute(["email" => $_POST["email"]]);




$stmt = $pdo->prepare("SELECT * FROM users");
$stmt->execute();
// Grab all rows as an array
$users = $stmt->fetchAll();
// Loop through and print them
foreach ($users as $user) {
    echo $user["name"] . "<br>";
}



$dsn = "mysql:host=localhost;dbname=site";
try {
    // Risky code: this will fail if the password is wrong
    $pdo = new PDO($dsn, "root", "wrong_password");
    echo "Connected successfully";
} catch (PDOException $e) {
    // This runs only if the app would have crashed
    echo "Connection failed";
} finally {
    // This always runs at the end
    echo "Task finished";
}



$name = "John";
$age = 25;
$is_active = true;
// Combining text and variables
echo "Welcome " . $name;



$x = 10;
$y = 3;
// Addition results in 13
echo $x + $y;
// Subtraction results in 7
echo $x - $y;
// Multiplication results in 30
echo $x * $y;
// Division results in 3.333
echo $x / $y;
// Modulus gets the remainder which is 1
echo $x % $y;
// Exponentiation raises 10 to the power of 3 which is 1000
echo $x ** $y;




$x = 10;
$y = "10";
$z = 5;
// True because the values match
$check = $x == $y;
// False because an integer is not the same type as a string
$check = $x === $y;
// True because the values are not equal
$check = $x != $z;
// True because 10 is greater than 5
$check = $x > $z;
// True because 10 is greater than or equal to 10
$check = $x >= 10;

function functionName($parameter1, $parameter2){
    // Code to be executed
    return $value; // Optional
}






// Check if the username field was actually submitted
if (isset($_POST["username"])) {
    // Strip out accidental spaces from the edges
    $username = trim($_POST["username"]);
    // Convert harmful HTML characters into safe plain text
    $username = htmlspecialchars($username);
    // Check if the cleaned text is completely empty
    if (empty($username)) {
        echo "Username is required!";
    } else {
        echo "Welcome, " . $username;
    }
}

$x = 10;
$y = "10";
$z = 5;
// True because the values match
$check = $x == $y;
// False because an integer is not the same type as a string
$check = $x === $y;
// True because the values are not equal
$check = $x != $z;
// True because 10 is greater than 5
$check = $x > $z;
// True because 10 is greater than or equal to 10
$check = $x >= 10;









$x = 10;
// Checking if x is LESS THAN 20
if ($x < 20) {
    echo "Condition 1 is true!"; // This runs
} 
// Checking if x is GREATER THAN 25
elseif ($x > 25) {
    echo "Condition 2 is true!"; // Skipped because 1st was true
} 
else {
    echo "Default case."; // Runs if nothing else matches
}



?>


<form action="welcome_get.php" method="get">
Name: <input type="text" name="name"><br>
E-mail: <input type="text" name="email"><br>
<input type="submit">
</form>