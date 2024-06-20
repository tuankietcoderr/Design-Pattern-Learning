interface IVideo {
  display(): void;
}

class RealVideo implements IVideo {
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.loadFromDisk(fileName);
  }

  display(): void {
    console.log(`Displaying real video ${this.fileName}`);
  }

  private loadFromDisk(fileName: string): void {
    console.log(`Loading video from disk with file ${fileName}`);
  }
}

class ProxyVideo implements IVideo {
  private realVideo: RealVideo;
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  display(): void {
    if (!this.realVideo) {
      this.realVideo = new RealVideo(this.fileName);
    }
    this.realVideo.display();
  }
}

const video = new ProxyVideo("video.mp4");

// The video is loaded from disk
video.display();

console.log("Displaying video again");

// The video is not loaded again
video.display();
