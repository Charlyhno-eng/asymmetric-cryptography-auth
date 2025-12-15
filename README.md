# asymmetric-cryptography-auth

This project proposes a minimalistic frontend built with Next.js, designed as a simple and efficient interface for testing the authentication workflow. The frontend allows users to interact naturally with the application, focusing specifically on the authentication experience without unnecessary complexity or design elements.

The backend is implemented in Go and communicates via REST APIs. Go is chosen for its high performance, reliability, and efficient concurrency management, making it ideal for scalable microservices architectures. REST APIs are preferred because they provide simple integration, broad interoperability with various clients, and ease of deployment, while remaining robust for security-oriented applications. Together, Go and REST APIs enable the development of modular authentication services that can be easily integrated into any project, promoting reusability and simplifying deployment on distributed systems.

At the core of the system lies an asymmetric cryptography-based authentication mechanism, ensuring that users can log in securely without transmitting their private keys over the network. Each user holds a cryptographic key pair: the private key is stored locally and used to sign authentication requests, while the public key is registered on the backend and used for signature verification. This approach provides a high level of security and privacy since authentication occurs through cryptographic validation rather than password exchange.

The microservice architecture encapsulates the authentication logic, making it straightforward to deploy and reuse across multiple applications. This model follows modern security best practices for identity and access management, emphasizing cryptographic integrity, simplicity, and scalability.

**(Linux only - Backend needs to be adapted for Windows or MacOS)**

## Installation

```bash
cd frontend/
npm install

cd backend/
go mod tidy
```

To start the frontend :

```bash
cd frontend/
npm run dev
```

To start the backend :

```bash
cd backend/
go run main.go
```

## How the project works

![Schema](public/schema.png)

1. Click the Connection button
2. Check if a USB drive is present and if it contains a private key
3. "Yes, there is a USB drive with a private key" or "No USB drive detected" or "No private key on the USB drive"
4. If there is a private key, check the database to see if there is an associated public key
5. If so, the connection will be established

In this project, the database contains a User table with two columns: username and public_key. When a user creates an account, they choose a username and generate a key pair. The public key is stored in the database during registration, while the private key is automatically downloaded as a file by the user. This file should be saved on a USB drive or any other storage device.

To sign in to the application, the user inserts their USB drive into the computer and clicks the Login button. The application reads the private key file and uses it to respond to a challenge issued by the server. For every authentication attempt, the server generates a random challenge message, ensuring that each session is unique and secure.

The application signs the server’s challenge with the private key. The resulting digital signature is then sent to the server, which verifies it using the public key linked to the username. At no point is the private key or any sensitive secret transmitted over the network — only the signature derived from the challenge is exchanged.

This approach ensures both security and privacy, as the server never gains access to the user’s private key. Even if the database is compromised, the attacker cannot authenticate without the private key stored securely on the user’s USB device. By eliminating traditional passwords, this method removes risks related to password theft, leakage, or phishing, offering a strong and modern alternative to conventional login systems.

### Create an account

1. To create an account, simply click on "Sign up" and then enter the username you want.
2. Once that's done, a "private_key.txt" file will be downloaded (it's important never to modify this file - neither its contents nor its name).
3. Create a folder named "auth_key" on a USB drive and place your "private_key.txt" file inside it..

### Sign in

To connect, you simply need to have the USB key plugged into your PC with the folder and the private key file.

![test_ok](public/test_ok.png)
![test_invalide](public/test_invalide.png)
![test_bad_name](public/test_bad_name.png)
![test_no_usb](public/test_no_usb.png)
