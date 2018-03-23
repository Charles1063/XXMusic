<?php

session_start();

if (isset($_POST['signin'])) {
    // connect to the database
    // Defined as constants so that they can't be changed
    DEFINE ('DB_USER', 'root');
    DEFINE ('DB_PASSWORD', '');
    DEFINE ('DB_HOST', 'localhost');
    DEFINE ('DB_NAME', 'music');

    // $dbc will contain a resource link to the database
    // @ keeps the error from showing in the browser

    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
    OR die('Could not connect to MySQL: ' .
    mysqli_connect_error());

    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $pwd = mysqli_real_escape_string($conn, $_POST['password']);
    
    if (empty($email) || empty($pwd)) {
        echo "<script>location.href='index.html';</script>";
        exit();
    } else {
        $sql = "SELECT * FROM user WHERE username = ? OR email = ?";
        
        $stmt = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt, $sql);
        mysqli_stmt_bind_param($stmt, "ss",$email, $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $stmt->close();

//        $result = mysqli_query($conn, $sql);
        $resultcheck = mysqli_num_rows($result);
        if ($resultcheck < 1) {
            echo "<script>location.href='index.html';</script>";
            exit();
        } else {
            if ($row = mysqli_fetch_assoc($result)) {
                $pwdcheck = password_verify($pwd, $row['upassword']);
//                $pwdcheck = ($pwd == $row['upassword']);
                if (!$pwdcheck) {
                    echo "<script>location.href='index.html';</script>";
                    exit();
                } elseif ($pwdcheck) {
                    // log in the user here

                    $_SESSION['uid'] = $row['uid'];
                    $_SESSION['email'] = $row['email'];
                    $_SESSION['name'] = $row['name'];
                    $_SESSION['username'] = $row['username'];
                    echo "<script>location.href='index.html';</script>";
                    exit();
                } else {
                    echo "<script>location.href='index.html';</script>";
                    exit();
                }
            }
        }
    }
} else {
    echo "<script>location.href='index.html';</script>";
    exit();
}
?>