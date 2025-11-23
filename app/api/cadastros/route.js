import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'progweb',
  user: 'postgres',
  password: '25052003',
});

// SOMENTE POST
export async function POST(request) {
  try {
    const { usuario, senha } = await request.json();

    // Validações
    if (!usuario || !senha) {
      return NextResponse.json(
        { error: 'Usuário e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (usuario.trim().length < 5) {
      return NextResponse.json(
        { error: 'O usuário precisa ter pelo menos 5 caracteres' },
        { status: 400 }
      );
    }

    if (senha.trim().length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter no mínimo 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar se o usuário já existe
    const verificaUsuario = await pool.query(
      'SELECT id FROM usuario WHERE usuario = $1',
      [usuario]
    );

    if (verificaUsuario.rows.length > 0) {
      return NextResponse.json(
        { error: 'Usuário já cadastrado' },
        { status: 409 }
      );
    }

    // Inserir novo usuário
    const result = await pool.query(
      'INSERT INTO usuario (usuario, senha) VALUES ($1, $2) RETURNING id, usuario',
      [usuario, senha]
    );

    const novoUsuario = result.rows[0];

    return NextResponse.json(
      { 
        message: 'Cadastro realizado com sucesso',
        usuario: novoUsuario
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return NextResponse.json(
      { error: 'Erro ao processar cadastro' },
      { status: 500 }
    );
  }
}