"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcertsController = void 0;
const common_1 = require("@nestjs/common");
const concerts_service_1 = require("./concerts.service");
const concert_dto_1 = require("./dto/concert.dto");
let ConcertsController = class ConcertsController {
    constructor(concertsService) {
        this.concertsService = concertsService;
    }
    findAll() {
        return this.concertsService.findAll();
    }
    findOne(data) {
        return this.concertsService.findOne(data.id);
    }
    create(data) {
        return this.concertsService.create(data);
    }
    update(data) {
        const { id, ...updateData } = data;
        return this.concertsService.update(id, updateData);
    }
    remove(data) {
        return this.concertsService.remove(data.id);
    }
};
exports.ConcertsController = ConcertsController;
__decorate([
    (0, common_1.Post)("list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConcertsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("detail"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [concert_dto_1.ConcertIdDto]),
    __metadata("design:returntype", Promise)
], ConcertsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [concert_dto_1.CreateConcertDto]),
    __metadata("design:returntype", Promise)
], ConcertsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [concert_dto_1.UpdateConcertDto]),
    __metadata("design:returntype", Promise)
], ConcertsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("remove"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [concert_dto_1.ConcertIdDto]),
    __metadata("design:returntype", Promise)
], ConcertsController.prototype, "remove", null);
exports.ConcertsController = ConcertsController = __decorate([
    (0, common_1.Controller)("concerts"),
    __metadata("design:paramtypes", [concerts_service_1.ConcertsService])
], ConcertsController);
//# sourceMappingURL=concerts.controller.js.map