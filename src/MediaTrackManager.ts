class MediaTrackManager {
  mediaStreamTrack: MediaStreamTrack | null = null
  constructor(mediaStreamTrack?: MediaStreamTrack) {
    this.mediaStreamTrack = mediaStreamTrack ?? null
  }

  public async applyConstraints(
    constraints: MediaTrackConstraints,
    onError?: (err: unknown) => void,
  ) {
    if (!this.mediaStreamTrack)
      return
    try {
      return await this.mediaStreamTrack?.applyConstraints(constraints)
    }
    catch (err) {
      onError?.(err)
    }
    return null
  }

  public getConstraints() { return this.mediaStreamTrack?.getConstraints() }
  public getSettings() { return this.mediaStreamTrack?.getSettings() }
  public getCapabilities() { return this.mediaStreamTrack?.getCapabilities() }
}

export default MediaTrackManager
