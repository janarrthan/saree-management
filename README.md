# Saree Management

A web app for running a saree business: manage the product catalogue, customers, vendors, orders and delivery services from one dashboard. Product photos and videos are stored on Google Drive, and email notifications are sent when orders change.

## Features

- **Products**: create products with categories, stock quantity, page price and a vendor selling price. Upload images and videos to Google Drive. Uploaded images get the product ID stamped on them automatically. Each product has a shareable preview page.
- **Orders**: create orders, add catalogue or external products to them, track delivery service, tracking code, totals, commission and delivery cost, and update order status. A notification email goes out when orders are created or updated.
- **Customers and vendors**: keep customer contact details and link customers to vendors.
- **Categories and delivery services**: manage the lookup lists used by products and orders.
- **Users and roles**: log in with sessions and reset forgotten passwords by email. Access is role-based:

  | Area | Admin | Vendor | Guest |
  |---|---|---|---|
  | Users | Full | – | – |
  | Categories | Full | – | – |
  | Products | Full | View | View |
  | Orders | Full | View, create, edit | – |
  | Customers | Full | View, create, edit | – |
  | Delivery services | Full | View | – |

## Tech stack

- **Backend:** Node.js, Express, express-session, express-fileupload
- **Database:** MongoDB with Mongoose
- **Views:** Handlebars (express-handlebars), Bootstrap 4, jQuery, DataTables, Toastr, SweetAlert
- **Storage:** Google Drive API (googleapis)
- **Email:** Nodemailer over Brevo SMTP
- **Images:** sharp

## Getting started

### Prerequisites

- Node.js 14.20.1 or later
- A MongoDB database (local or MongoDB Atlas)
- A Google Cloud OAuth client with the Drive API enabled, plus a refresh token (you can get one from the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground))
- A [Brevo](https://www.brevo.com/) account for sending email over SMTP

### Installation

```bash
git clone https://github.com/janarrthan/saree-management.git
cd saree-management
npm install
```

### Configuration

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on |
| `DOMAIN` | Public URL of the app, used in password reset links |
| `SESSION_SECRET` | Long random string used to sign session cookies |
| `PRODUCTION_DB` | MongoDB connection string |
| `SMTP_HOST`, `SMTP_PORT` | SMTP server (Brevo: `smtp-relay.brevo.com`, `587`) |
| `SMTP_USER` | Brevo SMTP login |
| `BREVO_API_KEY` | Brevo SMTP key |
| `MAIL_FROM` | Sender address for outgoing email |
| `ORDER_NOTIF_EMAIL` | Address that receives order notifications |
| `GD_CLIENT_ID`, `GD_CLIENT_SECRET` | Google OAuth client credentials |
| `GD_REDIRECT_URL` | OAuth redirect URL used when the refresh token was created |
| `GD_REFRESH_TOKEN` | Google OAuth refresh token |
| `GD_UPLOAD_PATH` | Google Drive folder ID for product media |
| `GD_ORDERS_PATH` | Google Drive folder ID for order media |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Details for the first admin account (see below) |

Never commit `.env`. It's already listed in `.gitignore`.

### Run

```bash
# Development (loads .env and restarts on changes; needs nodemon: npm install -g nodemon)
npm run dev

# Production (set the environment variables in your hosting platform)
npm start
```

Then open `http://localhost:<PORT>`.

### Creating the first admin

There's no sign-up page. To create the first admin account, uncomment the `createAccount` block near the bottom of `src/index.js`, set `ADMIN_NAME`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`, and start the app once. Then comment the block out again and add other users from the **Users** page.

## Project structure

```
├── public/            # Static assets: CSS and client-side JS
│   └── js/models/     # Client-side logic for each page
├── src/
│   ├── db/            # MongoDB connection
│   ├── middleware/    # Auth and role/permission checks
│   ├── models/        # Mongoose models
│   ├── routers/       # Page and API routes
│   ├── utils/         # Email, Google Drive, ID generation, image processing
│   └── index.js       # App entry point
└── views/             # Handlebars templates
```

## License

ISC
