import { bucket } from "./config";
import { ref, uploadBytes, getBytes, deleteObject } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

export async function storeImageData(userId:string, file:any){
    const bucketRef = ref(bucket, `images/${userId}/profile.jpg`)

    return await uploadBytes(bucketRef, file);
}

export async function getImageData(url: string){
    const bucketRef = ref(bucket, url);
    const binImageData = await getBytes(bucketRef);
    const blob = new Blob([binImageData],{type: "image/jpeg"});

    const imageUrl = URL.createObjectURL(blob);
    //console.log(imageUrl, "from bucket");
    return imageUrl;
}

export async function fetchImageFromBucket(userId: string): Promise<string | null> {
	try {
		const bucketRef = ref(bucket, `images/${userId}/profile.jpg`);
		const downloadURL = await getDownloadURL(bucketRef);
        console.log(downloadURL, "from bucket");
		return downloadURL;
	} catch (error: unknown) {
		console.error("Error fetching image from bucket:", error);
		if (typeof error === 'object' && error !== null && 'code' in error) {
			if (error.code === 'storage/object-not-found') {
				
			}
		}
		return null;
	}
}

export async function deleteImageFromBucket(userId: string): Promise<void> {
	try {
		const bucketRef = ref(bucket, `images/${userId}/profile.jpg`);
		await deleteObject(bucketRef);
		console.log("Profile image deleted successfully for user:", userId);
	} catch (error: unknown) {
		console.error("Error deleting image from bucket:", error);
		if (typeof error === 'object' && error !== null && 'code' in error) {
			if (error.code === 'storage/object-not-found') {
				console.log("Profile image not found for user:", userId);
			}
		}
		throw error;
	}
}



