import { CartItem } from "@/models/CartItem";
import sendgrid from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "NO_KEY_PRESENT");
var txt: string = "";

type Data = {
  error: string;
};

async function sendEmail(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    req.body.cartItems.forEach((item: CartItem) => {
      txt += `<tr><td style="text-align:center;">${item.name}</td><td style="text-align:center;">${item.quantity}</td></tr>`;
    });
    await sendgrid.send({
      personalizations: [
        {
          to: "uyiragamorganics@gmail.com", // Your email where you'll receive emails
          subject: `Hurray🎉 You've got order from ${req.body.fullname} for ₹ ${req.body.totalPrice}`,
        },
        {
          to: `${req.body.contact}`, // Your email where you'll receive emails
          subject: `Hurray🎉 Your order is succesfully placed`,
        },
      ],
      from: "uyiragamorganics@gmail.com", // your website email address here
      subject: `Hurray🎉 You've got order from ${req.body.fullname} for ₹ ${req.body.totalPrice}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">

        <title>The HTML5 Herald</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <style>
          body {
            font-family: Segoe UI, serif;
          }
           table,th,td {
            border: 1px solid;
            border-collapse: collapse;
           }
           span {
            font-size:16px;
            font-weight:400;
           }
           table {
            width: 40%;
           }
           @media (max-width : 900px) {
            table {
              width: 100%;
            }
           }
        </style>
      </head>
      <body>
            <div class="container" style="margin-left: 20px;margin-right: 20px;">              
              <div style="font-size: 16px;">
                <h2>Your order summary 🛒🛍️</h2>
                <h4>Customer Name: <span>${req.body.fullname}</span></h4>
                <h4>Address: <span>${req.body.address}</span></h4>
                <h4>Contact details: <span>${req.body.contact}</span></h4>
                <br>
                <table>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                    </tr>
                    ${txt}
                </table>
                <h3>Subtotal: <span>₹ ${req.body.totalPrice}</span></h3><br>
              </div>

              <img src="https://i.ibb.co/TLwT11B/logoua.png" class="logo-image" style="height: 50px;width: 150px;border-radius: 5px;overflow: hidden;">
              <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards,<br>Mugil Parasivam<br>Founder & Dev team<br>uyiragamorganics@gmail.com</p>
              <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                <a href="https://uyiragam.in/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
                <a href="https://uyiragam.in/blog/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Blog</a>
                <a href="https://github.com/krishkdev/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
                <a href="https://instagram.com/uyiragamorganic/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Instagram</a>

              </div>
            </div>
          </body>
        </html>`,
    });
  } catch (error: any) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
