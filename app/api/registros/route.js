import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'progweb',
  user: 'postgres',
  password: '25052003',
});

// GET - Obter todos os registros e o valor total
export async function GET() {
  try {
    // Consulta para obter todos os registros
    const registrosResult = await pool.query('SELECT id, tipo, valor, criado_em FROM registros ORDER BY criado_em DESC');
    const registros = registrosResult.rows;

    // Consulta para calcular o valor total
    const totalResult = await pool.query('SELECT SUM(valor) AS total FROM registros');
    const valorTotal = totalResult.rows[0].total || '0.00'; // Garante que seja '0.00' se não houver registros

    // Retorna os registros e o valor total
    return NextResponse.json({ registros, valorTotal });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Criar um novo registro
export async function POST(request) {
  try {
    const { tipo, valor } = await request.json();

    if (!tipo || !valor) {
      return NextResponse.json(
        { error: 'Tipo e valor são obrigatórios' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'INSERT INTO registros (tipo, valor) VALUES ($1, $2) RETURNING *',
      [tipo, valor]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
