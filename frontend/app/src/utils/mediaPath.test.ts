//Testing
import faker from "faker"

//Types
import { ActivityType } from "../store/types"
//Utils
import mediaPath from "./mediaPath"

describe(`mediaPath util`, () => {
  let path: string, mediaToken: string
  beforeEach(() => {
    path = `${faker.lorem.word()}.jpg`
    mediaToken = faker.random.alphaNumeric(32)
  })

  it(`should return media path for spirit activity type`, () => {
    expect(
      mediaPath({
        path,
        activityType: ActivityType.SPIRIT,
        mediaToken,
      }),
    ).toEqual(`https://mock.equedi.com/${path}`)
  })

  it(`should return media path for other activity type`, () => {
    expect(
      mediaPath({
        path,
        activityType: ActivityType.ACADEMIC_ART,
        mediaToken,
      }),
    ).toEqual(`https://mock.equedi.com/media/${path}?eqmt=${mediaToken}`)
  })
})
