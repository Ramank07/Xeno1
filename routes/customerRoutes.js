const express = require("express");
const Customer = require("../models/Customer"); // Import Customer model
const router = express.Router();


router.get('/',(req,res)=>{
  res.status(200).json('WELCOME');
 })


// Route: Add a customer or add an order for an existing customer
router.post('/order', async (req, res) => {
  const { name, email, phone, address, order } = req.body;

  try {
    // Check if the customer already exists
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      // Customer exists, push the new order
      existingCustomer.orders.push(order); // Add the new order
      await existingCustomer.save(); // Save changes
      return res.status(200).json({
        message: "Order added to existing customer",
        customer: existingCustomer,
      });
    }

    // If customer doesn't exist, create a new customer with the order
    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
      orders: [order], // Initialize orders array with the provided order
    });

    await newCustomer.save();
   return res.status(201).json({
      message: "Customer and order added successfully",
      customer: newCustomer,
    });
  } catch (error) {
   return  res.status(500).json({ message: "Error processing request", error });
  }
});
router.get('/:email',async(req,res)=>{
  try {
    const email=req.params.email;
    console.log('Email received:', email);
      if(!email){
       /// console.log('No email provided');
       return res.json('Please provide Email Id')
      }
      const response = await Customer.findOne({ email:email });
      // console.log('Database response:', response);
      if(!response ){
       // console.log(`No data found for ${email}`);
       return res.json(`No data found of ${email}}`)
      }else{
        
        return res.status(200).json(response);
      }
  } catch (error) {
    return  res.status(500).json({ message: "Error processing request", error });
  }
  
})

module.exports = router;
