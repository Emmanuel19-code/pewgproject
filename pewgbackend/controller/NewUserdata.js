import { GenerateUniquId } from "../utils/generateUniqueId.js";
import { conn } from "../database/mysqlConnection.js";

const NewUserData = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    gender,
    selectedArea,
    district,
    local,
    selectedProfession,
    selectedGuild,
    selectedStatus,
    studentSchool,
    studentCourse,
    studentLevel,
  } = req.body;

  // Check if any required fields are missing
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !gender ||
    !selectedArea ||
    !district ||
    !local ||
    !selectedProfession ||
    !selectedGuild ||
    !selectedStatus
  ) {
    return res.status(400).json({
      msg: "Please provide the missing details",
    });
  }

  try {
    const checkDuplicateEmail = "SELECT * FROM users1 WHERE email = ?";
    const [existingEmail] = await conn
      .promise()
      .query(checkDuplicateEmail, [email]);
    if (existingEmail.length > 0) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const checkDuplicatePhone =
      "SELECT * FROM users1 WHERE mobilephonenumber = ?";
    
    const [existingPhone] = await conn
      .promise()
      .query(checkDuplicatePhone, [phone]);

    if (existingPhone.length > 0) {
      return res.status(400).json({ msg: "Phone number already exists" });
    }
    const checkName = "SELECT * FROM users1 WHERE firstname = ? and lastname = ?"
    const [existingName] = await conn.promise().query(checkName,[firstName,lastName])
    if(existingName.length > 0){
      return res.status(400).json({
        msg:"This person is already registered"
      })
    }
    let secret = GenerateUniquId();
    const InsertNewUser = `INSERT INTO users1 (name, firstname, lastname, gender, mobilephonenumber, email, secret) 
                          VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const InsertChurchArea = `Insert into churcharea1 (churchArea,district,local,imageUrl,guild,userid,memberstatus) values (?,?,?,?,?,?,?)`;
    const InsertIntoUserRecord = `Insert into user_records1 (userid,memberstatus,email,image,secret,studentschool,studentcourse,studentlevel,profession) values (?,?,?,?,?,?,?,?,?)`;
    await conn
      .promise()
      .query(InsertNewUser, [
        firstName,
        firstName,
        lastName,
        gender,
        phone,
        email,
        secret,
        
      ]);

    await conn
      .promise()
      .query(InsertChurchArea, [
        selectedArea,
        district,
        local,
        req.file.filename,
        selectedGuild,
        secret,
        selectedStatus,
      ]);
    await conn
      .promise()
      .query(InsertIntoUserRecord, [
        secret,
        selectedStatus,
        email,
        req.file.filename,
        secret,
        studentSchool,
        studentCourse,
        studentLevel,
        selectedProfession,
      ]);
    return res.status(200).json({
      msg: "User created successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      msg: "Error occurred",
      error: error.message,
    });
  }
};

export { NewUserData };
