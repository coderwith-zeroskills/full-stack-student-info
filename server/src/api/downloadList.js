import express from "express";
import client from "../client.cjs";
import fs from "fs"
const router = express.Router();

router.get('/', (req, res) => {
    const filePath = '../../resources/text.txt';
    
    // Check if the file exists
    fs.access(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }

        // Set appropriate headers
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', 'attachment; filename=example.txt');

        // Create a readable stream from the file
        const fileStream = fs.createReadStream(filePath);

        // Stream the file to the response object
        fileStream.pipe(res);
    });
});
export default router;
