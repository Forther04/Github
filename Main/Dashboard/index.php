<?php
session_start();
if (!isset($_SESSION["user"])) {
    header("Location: ../login.php"); // Redirect to login if not logged in
    exit();
}
$user = $_SESSION["user"];
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <!---ICONS-->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
      integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="style.css" />
    <link rel="icon" href="../../1-Assest/AU_Logo.png" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AUPC Registration</title>
  </head>

  <body>
    <div id="ImageBackground"></div>
    <div>
      <h1 id="NavText">Welcome</h1>
    </div>
    <!--!NAVIGATION-->
    <div id="NavigationBar">
      <img src="../../1-Assest/AU_Logo.png" id="logo" alt="Arellano University Logo" />
      <div id="icon">
        <a>
          <i class="fa-solid fa-user icons"></i>
        </a>
        <a href="../About/about.html">
          <i class="fa-solid fa-info-circle icons"></i>
        </a>
        <a href="../News/news.html"><i class="fa-solid fa-newspaper icons"></i></a>
      </div>
      <button id="logout">
        <i class="fa-solid fa-right-from-bracket log"></i>
      </button>
    </div>
    <h1 class="title">Information</h1>
    <div class="white-background">
      <div>
        <h3 class="info">Gender</h3>
        <h4 class="data" id="gender"> <?php echo htmlspecialchars($user["Gender"])?> </h4>
      </div>
      <div>
        <h3 class="info">Birthday</h3>
        <h4 class="data" id="bday"><?php echo htmlspecialchars($user["Birthday"])?></h4>
      </div>
      <div>
        <h3 class="info">Strand</h3>
        <h4 class="data" id="strand"><?php echo htmlspecialchars($user["Strand"])?></h4>
      </div>
      <div>
        <h3 class="info">LRN</h3>
        <h4 class="data" id="lrn"><?php echo htmlspecialchars($user["LRN"])?></h4>
      </div>
      <div>
        <h3 class="info">Year Graduated</h3>
        <h4 class="data" id="graduated"><?php echo htmlspecialchars($user["Graduated"])?></h4>
      </div>
      <div>
        <h3 class="info">Previous School</h3>
        <h4 class="data" id="school"><?php echo htmlspecialchars($user["Previous_school"])?></h4>
      </div>
      <div>
        <h3 class="info">Previous School Address</h3>
        <h4 class="data" id="aschool"><?php echo htmlspecialchars($user["Previous_school_address"])?></h4>
      </div>
      <div>
        <h3 class="info">Current Address</h3>
        <h4 class="data" id="address"><?php echo htmlspecialchars($user["Address"])?></h4>
      </div>
    </div>
    <div class="username">
      <h3 id="name">Name</h3>
      <h2 id="useractualname">
      <?php echo htmlspecialchars($user["GivenName"])?>
      <?php echo htmlspecialchars($user["MI"])?>
      <?php echo htmlspecialchars($user["LastName"])?>
    </h2>
    </div>
    <div class="images">
        <a href="<?php echo !empty($user["User_Picture"]) ? '../../Database/' . htmlspecialchars($user["User_Picture"]) : '../../1-Assest/PlaceHolder.png'; ?>" target="_blank">
            <img src="<?php echo !empty($user["User_Picture"]) ? '../../Database/' . htmlspecialchars($user["User_Picture"]) : '../../1-Assest/PlaceHolder.png'; ?>" 
                alt="User picture" id="user_pic" class="picture" />
        </a>
        <a href="<?php echo !empty($user["Card_Picture"]) ? '../../Database/' . htmlspecialchars($user["Card_Picture"]) : '../../1-Assest/PlaceHolder.png'; ?>" target="_blank">
            <img src="<?php echo !empty($user["Card_Picture"]) ? '../../Database/' . htmlspecialchars($user["Card_Picture"]) : '../../1-Assest/PlaceHolder.png'; ?>" 
                alt="Card picture" id="card_pic" class="picture" />
        </a>
    </div>

  </body>
  <script src="script.js"></script>
</html>

