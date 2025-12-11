class ImageCaptureManager {
  imageCapture: ImageCapture | null = null
  constructor(mediaStreamTrack?: MediaStreamTrack) {
    this.imageCapture = mediaStreamTrack ? new ImageCapture(mediaStreamTrack) : null
  }

  public async takePhoto(
    photoSettings: PhotoSettings,
    onError?: (err: unknown) => void,
  ) {
    if (!this.imageCapture)
      return null
    try {
      return await this.imageCapture.takePhoto(photoSettings)
    }
    catch (err) {
      onError?.(err)
    }
    return null
  }

  public async getPhotoSettings() { return await this.imageCapture?.getPhotoSettings() }
  public async getPhotoCapabilities() { return await this.imageCapture?.getPhotoCapabilities() }
}
export default ImageCaptureManager
