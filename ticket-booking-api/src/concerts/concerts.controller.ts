import { Controller, Post, Body } from "@nestjs/common"
import { ConcertsService } from "./concerts.service"
import { CreateConcertDto, UpdateConcertDto, ConcertIdDto, ResponseConcertDto } from "./dto/concert.dto"

@Controller("concerts")
export class ConcertsController {
    constructor(private readonly concertsService: ConcertsService) { }

    @Post("list")
    findAll(): Promise<ResponseConcertDto[]> {
        return this.concertsService.findAll()
    }

    @Post("detail")
    findOne(@Body() data: ConcertIdDto): Promise<ResponseConcertDto> {
        return this.concertsService.findOne(data.id)
    }

    @Post("create")
    create(@Body() data: CreateConcertDto): Promise<ResponseConcertDto> {
        return this.concertsService.create(data)
    }

    @Post("update")
    update(@Body() data: UpdateConcertDto): Promise<ResponseConcertDto> {
        const { id, ...updateData } = data
        return this.concertsService.update(id, updateData)
    }

    @Post("remove")
    remove(@Body() data: ConcertIdDto): Promise<ResponseConcertDto> {
        return this.concertsService.remove(data.id)
    }
}
