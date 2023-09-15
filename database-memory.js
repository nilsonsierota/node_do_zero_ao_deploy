import { randomUUID } from "node:crypto"

export class DatabaseMemory{
  #videos = new Map()

  list(search){
    return Array.from(this.#videos.entries()).map((videoArray) => {
      const id = videoArray[0]
      const data = videoArray[1]

      return {
        id,
        ...data
      }
    }).filter((video) => {
      if(!search){
        return true
      }

      const title = video.title.toLowerCase()
      const description = video.description.toLowerCase()

      return title.includes(search) || description.includes(search)
    })
  }

  create(video){
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  }

  update(id, video){
    this.#videos.set(id, video)
  }

  delete(id){
    this.#videos.delete(id)
  }
}