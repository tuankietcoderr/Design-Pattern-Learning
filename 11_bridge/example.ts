interface IDevice {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

class RemoteControl {
  protected device: IDevice;

  constructor(device: IDevice) {
    this.device = device;
  }

  togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  channelDown(): void {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 1);
  }
}

class AdvancedRemoteControl extends RemoteControl {
  mute(): void {
    this.device.setVolume(0);
  }
}

class TV implements IDevice {
  private enabled: boolean = false;
  private volume: number = 50;
  private channel: number = 1;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }
}

class Radio implements IDevice {
  private enabled: boolean = false;
  private volume: number = 30;
  private channel: number = 1;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }
}

const tv = new TV();

const remoteControl = new RemoteControl(tv);
remoteControl.togglePower();

console.log(tv.isEnabled());

remoteControl.volumeUp();
remoteControl.volumeUp();
console.log(tv.getVolume());

remoteControl.channelUp();
console.log(tv.getChannel());

const radio = new Radio();
const advancedRemoteControl = new AdvancedRemoteControl(radio);
advancedRemoteControl.togglePower();

console.log(radio.isEnabled());

advancedRemoteControl.mute();
console.log(radio.getVolume());
