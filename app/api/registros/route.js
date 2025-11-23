import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'progweb',
  user: 'postgres',
  password: '25052003',
});

// GET - Buscar todos os registros
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT * FROM registros
      ORDER BY id DESC
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Criar novo registro
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