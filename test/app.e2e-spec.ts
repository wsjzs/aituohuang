import { beforeEach, describe, expect, it } from 'vitest'

import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from '~/app.controller'
import { fastifyApp } from '~/common/adapter/fastify.adapter'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication(fastifyApp)
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  it('/ (GET)', () => {
    return app.inject('/').then((res) => {
      expect(res.statusCode).toBe(200)
    })
  })
})
