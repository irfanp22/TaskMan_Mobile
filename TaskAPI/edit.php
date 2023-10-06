<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$id = trim($data['id']);
$title = trim($data['title']);
$desc = trim($data['desc']);
$status = trim($data['status']);
http_response_code(201);
if ($title != '' and $desc != '') {
    $query = mysqli_query($koneksi, "update task set title='$title',desc='$desc', status='$status'where
id='$id'");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
