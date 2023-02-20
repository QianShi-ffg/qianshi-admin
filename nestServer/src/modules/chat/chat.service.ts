import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { Configuration, OpenAIApi } from 'openai';

export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);
let conversationObj = {
  parentMessageId: null,
  conversationId: null,
};

let api = '';
let count = 0;
let countTimeer = null;

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
    const { ChatGPTAPI } = await importDynamic('chatgpt');
    const res = await this.findOne(1);
    clearInterval(countTimeer);
    countTimeer = setInterval(() => {
      count++;
      // 10分钟没有再次访问视为不再继续使用，计时器停止计时
      if (count >= 600) {
        clearInterval(countTimeer);
        count = 0;
      }
    }, 1000);
    if (count === 0) {
      // 初始访问 init
      api = new ChatGPTAPI({ apiKey: res.key });
    } else if (count > 0 && count <= 300) {
      // 5分钟间隔判断在话题时间内
      count = 1;
    } else {
      // 超出话题间隔时间，则重新计数，重新开始话题
      api = new ChatGPTAPI({ apiKey: res.key });
      count = 1;
    }
    const response = await this.generateResponse(api, message);

    return {
      code: 200,
      data: [
        {
          text: response,
        },
      ],
      message: '获取成功',
    };
    // const openai = new OpenAIApi(configuration);
    // try {
    //   const completion = await openai.createCompletion({
    //     prompt: message,
    //     model: 'text-davinci-003',
    //     temperature: 0.8,
    //     max_tokens: 1024,
    //     top_p: 1,
    //     frequency_penalty: 0.0,
    //     presence_penalty: 0.6,
    //     stop: ['Human:', 'AI:'],
    //   });
    //   console.log(completion.data.choices[0].text);
    //   return {
    //     code: 200,
    //     data: completion.data.choices,
    //     message: '获取数据成功',
    //   };
    // } catch (error) {
    //   if (error.response) {
    //     console.log(error.response.status);
    //     console.log(error.response.data);
    //   } else {
    //     console.log(error.message);
    //   }
    // }
    // const response = await openai11.listEngines();
  }

  // 处理用户输入并生成响应
  async generateResponse(api, input) {
    console.log(api);
    // 将id输入添加到上下文中
    try {
      const res = await api.sendMessage(input, {
        conversationId: conversationObj.conversationId,
        parentMessageId: conversationObj.parentMessageId,
      });
      conversationObj = {
        conversationId: res.conversationId,
        parentMessageId: res.id,
      };
      // console.log(res, '----------------------------');
      const text = res.text;

      // 返回生成的响应
      return text;
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
}
