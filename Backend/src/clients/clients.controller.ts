import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientDto } from './dto/query-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Clients')
@ApiBearerAuth('JWT-auth')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all paginated clients with search and status filter' })
  @ApiResponse({ status: 200, description: 'Paginated list of clients' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Query() query: QueryClientDto) {
    const result = await this.clientsService.findAll(query);
    return {
      success: true,
      data: {
        items: result.items,
        meta: result.meta,
      },
    };
  }

  @Post('submit-lead')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Public endpoint to register client leads from website form' })
  @ApiResponse({ status: 201, description: 'Client lead submitted successfully' })
  async submitLead(@Body() submitLeadDto: import('./dto/submit-lead.dto').SubmitLeadDto) {
    const data = await this.clientsService.submitLead(submitLeadDto);
    return {
      success: true,
      message: 'Client lead registered successfully',
      data,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a client by UUID' })
  @ApiParam({ name: 'id', description: 'Client UUID', type: String })
  @ApiResponse({ status: 200, description: 'Client details' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.clientsService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new client (ADMIN only)' })
  @ApiResponse({ status: 201, description: 'Client created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 409, description: 'Client slug or email already exists' })
  async create(@Body() createClientDto: CreateClientDto) {
    const data = await this.clientsService.create(createClientDto);
    return {
      success: true,
      message: 'Client created successfully',
      data,
    };
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an existing client (ADMIN only)' })
  @ApiParam({ name: 'id', description: 'Client UUID', type: String })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const data = await this.clientsService.update(id, updateClientDto);
    return {
      success: true,
      message: 'Client updated successfully',
      data,
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Archive a client (ADMIN only)' })
  @ApiParam({ name: 'id', description: 'Client UUID', type: String })
  @ApiResponse({ status: 200, description: 'Client archived successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Requires ADMIN role)' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.clientsService.remove(id);
    return {
      success: true,
      message: 'Client archived successfully',
      data,
    };
  }
}
