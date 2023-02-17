import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private ChatRepository: Repository<Chat>,
  ) {}

  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return this.ChatRepository.findOne({
      where: { id: id },
    });
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }

  /**
   *
   * @param message 输入值
   * @returns 返回值
   */
  async chat(message: string) {
    const res = await this.findOne(1);
    //chat
    const configuration = new Configuration({
      apiKey: res.key,
    });
    const openai = new OpenAIApi(configuration);
    try {
      const completion = await openai.createCompletion({
        prompt: message,
        model: 'text-davinci-003',
        temperature: 0.8,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: ['Human:', 'AI:'],
      });
      console.log(completion.data.choices[0].text);
      return {
        code: 200,
        data: completion.data.choices,
        message: '获取数据成功',
      };
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
    // const response = await openai11.listEngines();
  }
}
