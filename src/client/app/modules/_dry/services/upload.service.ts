import { EventEmitter, Injectable } from '@angular/core';
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
	$upload$: EventEmitter<Upload> = new EventEmitter<Upload>();
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
	pushUpload(): Upload {
		this.currentUpload;
		const storageRef = firebase.storage().ref();
		const uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
				// upload in progress
				const snap = snapshot;
				this.currentUpload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
			}, (error) => {
				// upload failed
				console.log(error);
			}, () => {
				// upload success
				if (uploadTask.snapshot.downloadURL) {
					this.currentUpload.url = uploadTask.snapshot.downloadURL;
					this.currentUpload.name = this.currentUpload.file.name;
					this.saveFileData();
					this.$upload$.next(this.currentUpload);
				} else {
					console.error('No download URL!');
				}
			},
		);
		return this.currentUpload;
	}
	// Writes the file details to the realtime db
	private saveFileData(): firebase.database.ThenableReference {
		return this.db.list(`uploads/${this.basePath}/`).push(this.currentUpload);
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
		console.log($event)
		this.selectedFiles = ($event.target as HTMLInputElement).files;
	}
}
