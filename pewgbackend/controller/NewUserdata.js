const NewUserData = async (req, res) => {
  const { firstName, lastName, email, phone, gender, selectedArea, district, local, selectedProfession, selectedGuild, selectedStatus } = req.body;
  
    if (!firstName || !lastName || !email || !phone || !gender || !selectedArea || !district || !local || !selectedProfession || !selectedGuild || !selectedStatus) {
      return res.status(400).json({
        msg: "Please provide the missing details",
      });
    }
    console.log(req.body);
    
    
    
    res.status(200).json({
      msg: req.file,
      data: req.body,
    });
  };
  
  module.exports = { NewUserData };
  