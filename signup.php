
<?php
    
    session_start();
//    echo '<p>test file. </p>';

if (isset($_POST['signup'])) {
    //test
    //echo "You press the sign up button!";

    // connect to the databasep
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

//    $username = mysqli_real_escape_string($conn, $_POST['username']);
//    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $username = 'new_user';
    $name = 'new_user';
    $pwd = mysqli_real_escape_string($conn, $_POST['password']);
    $rpwd = mysqli_real_escape_string($conn, $_POST['re_password']);
    $email = mysqli_real_escape_string($conn, $_POST['e-mail']);

    if (empty($pwd) || empty($rpwd) || empty($email)) {
        //echo "empty space show!";
        echo "<script>location.href='index.html?empty_input';</script>";
        exit();
    } else {
        //check if input are valid
        if ( !preg_match('~[0-9]~', $pwd) || !preg_match('~[a-zA-Z]~', $pwd) || strlen($pwd) < 6) {
            echo "<script>location.href='index.html?password_too_weak';</script>";
            exit();              
        } else{
            //check if email is valid
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo "<script>location.href='index.html?invalid_email';</script>";
                exit();       
            } else {

                $sql = "select * from user where email = ?";
                $stmt = mysqli_stmt_init($conn);
                mysqli_stmt_prepare($stmt, $sql);
                mysqli_stmt_bind_param($stmt, "s", $email);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);
                $stmt->close();
                //$result = mysqli_query($conn, $sql);
                $resultcheck = mysqli_num_rows($result);
                if ($resultcheck > 0) {
                    echo "<script>location.href='index.html?email_been_used';</script>";
                    exit();     
                } else {
                    if ($pwd != $rpwd) {
                        echo "<script>location.href='index.html?password_inconsisitent';</script>";
                        exit(); 
                    } else {
                        $hashedpwd = password_hash($pwd, PASSWORD_DEFAULT);

                        $stmt = mysqli_stmt_init($conn);
                        mysqli_stmt_prepare($stmt, "LOCK TABLE User WRITE;");
                        mysqli_stmt_execute($stmt);
                        $stmt->close();

                        //insert into user
                        $sql = "
                                INSERT INTO `user` (username, name, upassword, email) 
                                VALUES (?, ?, ?, ?);
                                ;";
                        $stmt = mysqli_stmt_init($conn);
                        mysqli_stmt_prepare($stmt, $sql);
                        mysqli_stmt_bind_param($stmt, "ssss",$username, $name, $hashedpwd, $email);
                        mysqli_stmt_execute($stmt);
                        $stmt->close();
//                            mysqli_query($conn, $sql);

                        $stmt = mysqli_stmt_init($conn);
                        mysqli_stmt_prepare($stmt, "UNLOCK TABLES;");
                        mysqli_stmt_execute($stmt);
                        $stmt->close();

                        $sql = "select * from user where username = ?";

                        $stmt = mysqli_stmt_init($conn);
                        mysqli_stmt_prepare($stmt, $sql);
                        mysqli_stmt_bind_param($stmt, "s", $username);
                        mysqli_stmt_execute($stmt);
                        $result = mysqli_stmt_get_result($stmt);
                        $stmt->close();

                        $row = mysqli_fetch_assoc($result);
                        $_SESSION['uid'] = $row['uid'];
                        $_SESSION['email'] = $row['email'];
                        $_SESSION['name'] = $row['name'];
                        $_SESSION['username'] = $username;

                        echo "<script>location.href='index.html?sign_up_successful';</script>";
                        exit(); 
                    }
                }

            }
        }
    }

} else {
    
    exit();
}   

?>