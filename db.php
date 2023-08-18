<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = 'localhost';
$dbname = 'users';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $dob = $_POST['dob'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
	
	// Validate data
	if (empty($fullname) || empty($email) || empty($mobile) || empty($dob) || empty($age) || empty($gender)) {
		echo json_encode(array("message" => "Please fill in all fields."));
		exit;
	}
	
	if (!preg_match('/^[a-zA-Z,.\s]+$/', $fullname)) {
		echo json_encode(array("message" => "Invalid name format. Only letters, commas, and periods are allowed."));
		exit;
	}
	
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		echo json_encode(array("message" => "Invalid email format."));
		exit;
	}

	if (!preg_match('/^(09|\+639)\d{9}$/', $mobile)) {
		echo json_encode(array("message" => "Invalid mobile number format. Please enter a valid PH mobile number."));
		exit;
	}
		
    $stmt = $conn->prepare("INSERT INTO user_info (fullname, email, mobile, dob, age, gender) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$fullname, $email, $mobile, $dob, $age, $gender]);

    echo json_encode(array("message" => "Data successfully saved."));
} catch(PDOException $e) {
    echo json_encode(array("message" => "Error: " . $e->getMessage()));
}
$conn = null;
?>
