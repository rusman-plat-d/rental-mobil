import { Injectable } from '@angular/core';
import { Upload } from '../classes/upload.class';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

	basePath = 'uploads';
	currentUpload: Upload;
	uploadsRef: AngularFireList<Upload>;
	uploads: Observable<Upload[]>;
	selectedFiles: FileList | null;

	constructor(private db: AngularFireDatabase) { }

	getUploads(): Observable<Upload[]> {
		this.uploads = this.db.list(this.basePath).snapshotChanges().map((actions) => {
			return actions.map((a) => {
				const data = a.payload.val();
				const $key = a.payload.key;
				return { $key, ...data };
			});
		});
		return this.uploads;
	}

	deleteUpload(upload: Upload): Promise<void> {
		return this.deleteFileData(upload.$key)
		.then( () => {
			this.deleteFileStorage(upload.name);
		})
		.catch((error) => console.log(error));
	}

	// Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
	pushUpload(upload: Upload): Upload {
		const storageRef = firebase.storage().ref();
		const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
			// upload in progress
			const snap = snapshot;
			upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
			}, (error) => {
				// upload failed
				console.log(error);
			}, () => {
				// upload success
				if (uploadTask.snapshot.downloadURL) {
					this.currentUpload.url = upload.url = uploadTask.snapshot.downloadURL;
					this.currentUpload.name = upload.name = upload.file.name;
					this.saveFileData(upload);
				} else {
					console.error('No download URL!');
				}
			},
		);
		return upload;
	}
	// Writes the file details to the realtime db
	private saveFileData(upload: Upload): firebase.database.ThenableReference {
		return this.db.list(`${this.basePath}/`).push(upload);
	}
	// Writes the file details to the realtime db
	private deleteFileData(key: string): Promise<void> {
		return this.db.list(`${this.basePath}/`).remove(key);
	}
	// Firebase files must have unique names in their respective storage dir
	// So the name serves as a unique key
	private deleteFileStorage(name: string): Promise<any> {
		const storageRef = firebase.storage().ref();
		return storageRef.child(`${this.basePath}/${name}`).delete()
	}
	detectFiles($event: Event): void {
		this.selectedFiles = ($event.target as HTMLInputElement).files;
	}
	uploadSingle(): Upload {
		const file = this.selectedFiles;
		this.currentUpload = new Upload(file.item(0));
		return this.pushUpload(this.currentUpload)
	}
}
