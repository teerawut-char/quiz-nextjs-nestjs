import { ConcertsService } from "./concerts.service";
import { CreateConcertDto, UpdateConcertDto, ConcertIdDto, ResponseConcertDto } from "./dto/concert.dto";
export declare class ConcertsController {
    private readonly concertsService;
    constructor(concertsService: ConcertsService);
    findAll(): Promise<ResponseConcertDto[]>;
    findOne(data: ConcertIdDto): Promise<ResponseConcertDto>;
    create(data: CreateConcertDto): Promise<ResponseConcertDto>;
    update(data: UpdateConcertDto): Promise<ResponseConcertDto>;
    remove(data: ConcertIdDto): Promise<ResponseConcertDto>;
}
