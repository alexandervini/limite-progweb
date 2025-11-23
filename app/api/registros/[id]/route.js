import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'progweb',
  user: 'postgres',
  password: '25052003',
});

// PUT - Atualizar um registro existente
export async function PUT(request, { params }) {
  const { id } = await params;
  
  try {
    const { tipo, valor } = await request.json();

    if (!tipo || !valor) {
      return NextResponse.json(
        { error: 'Tipo e valor são obrigatórios' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'UPDATE registros SET tipo = $1, valor = $2 WHERE id = $3 RETURNING *',
      [tipo, valor, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Registro não encontrado' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Deletar um registro
export async function DELETE(request, { params }) {
  const { id } = await params;
  
  try {
    const result = await pool.query('DELETE FROM registros WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Registro não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Registro deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}