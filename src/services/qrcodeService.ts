import QRcode from "qrcode";

export async function generateQRCode(text: string): Promise<string> {
    try {
        // menghasilkan QR code berbasis DataURL (base64)
        const dataUrl = await QRcode.toDataURL(text);
        return dataUrl;
    } catch (error) {
        throw new Error("Gagal menghasilkan QR Code");
    }
}