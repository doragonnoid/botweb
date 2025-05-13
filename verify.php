<?php
header("Content-Type: application/json");

$premiumEmailsFile = 'premium_emails.json';
$input = json_decode(file_get_contents("php://input"), true);
$email = trim($input['email'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Email tidak valid."]);
    exit;
}

// Baca daftar email premium
$premiumEmails = file_exists($premiumEmailsFile) ? json_decode(file_get_contents($premiumEmailsFile), true) : [];

if (in_array(strtolower($email), array_map('strtolower', $premiumEmails))) {
    echo json_encode(["success" => true, "message" => "Akses premium aktif."]);
} else {
    echo json_encode(["success" => false, "message" => "Email tidak ditemukan dalam daftar premium."]);
}
?>
