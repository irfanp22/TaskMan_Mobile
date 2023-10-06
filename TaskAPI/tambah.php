<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
//terima data dari mobile
$title = trim($data['title']);
$desc = trim($data['desc']);
http_response_code(201);
if ($title != '' and $desc != '') {
    $query = mysqli_query($koneksi, "insert into task(title,desc) values('$title','$desc')");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
