-- BioGuard Schema
-- PostgreSQL 15+

CREATE TABLE Usuario (id SERIAL PRIMARY KEY, nome TEXT NOT NULL, email TEXT NOT NULL UNIQUE, senha TEXT NOT NULL, tipo_usuario TEXT NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE Institution (id SERIAL PRIMARY KEY, nome TEXT NOT NULL, tipo TEXT NOT NULL, responsavel TEXT, local TEXT NOT NULL, telefone TEXT NOT NULL, status_validacao BOOLEAN DEFAULT false);

CREATE TABLE Occurrence (id SERIAL PRIMARY KEY, animal TEXT NOT NULL, porte TEXT NOT NULL, localizacao TEXT NOT NULL, estado_aparente TEXT NOT NULL, foto_url TEXT, latitude FLOAT, longitude FLOAT, status TEXT DEFAULT 'pendente', userId INTEGER REFERENCES Usuario(id) ON DELETE RESTRICT, institutionId INTEGER REFERENCES Institution(id) ON DELETE SET NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE UNIQUE INDEX idx_usuario_email ON Usuario(email);
