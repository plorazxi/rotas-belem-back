import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export default class repository {
    
    prisma = new PrismaClient({ adapter });

    async get(): Promise<any[]>{
        try {
            // Query para pegar todas as rotas
            const rotas = await this.prisma.$queryRaw<any[]>`
            	SELECT 
                id, 
                nome,
                ST_AsGeoJSON(trajeto)::json AS trajeto_geojson
                FROM "Rota"
            `;
            return rotas;
        } catch (error) {
            console.error("Erro ao buscar as rotas:", error);
            throw error;
        }
    }

    async post(nome: String, trajeto: any) {
        try{
        	//Transformando o objeto GeoJSON em uma String para o banco ler
        	const geojsonString = JSON.stringify(trajeto);

        	//Inserindo usando o $queryRaw para podermos retornar o dado salvo
        	const rotaSalva = await this.prisma.$queryRaw`
        		INSERT INTO "Rota" (nome, trajeto)
        		VALUES (
          			${nome},
          			ST_SetSRID(ST_GeomFromGeoJSON(${geojsonString}), 4326)
        		)
      		`;
    	} catch (error) {
      		console.error("Erro ao salvar a rota:", error);
      		throw error;
    	}
    }

    async delete(id: number) {
        try {
            await this.prisma.rota.delete({
                where: {
                    id: id
                }
            });
        }catch (error){
            console.error("Erro ao deletar a rota:", error);
            throw error;
        }     
    }
}
