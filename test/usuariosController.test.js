const usuariosController = require('../api/controladores/usuariosController.js').usuariosController;
const usuariosModel = require('../api/modelos/usuariosModel.js').usuariosModel;
const crypto = require('crypto-js');
const config = { secret: 'test_secret' };

// Mock de la conexión a MongoDB para evitar timeouts
jest.mock('../api/modelos/usuariosModel.js', () => {
    return {
        usuariosModel: {
            Registrar: jest.fn((post, callback) => callback({ state: true })),
            Existe: jest.fn((post, callback) => callback([])),
            ListarTodos: jest.fn((filtro, callback) => callback(null, [])),
            ListarUnico: jest.fn((post, callback) => callback({})),
            Actualizar: jest.fn((post, callback) => callback({ state: true })),
            Borrar: jest.fn((post, callback) => callback({ state: true })),
            Login: jest.fn((post, callback) => callback([{ estado: "Active", nombre: "Test User" }])),
            Activar: jest.fn((post, callback) => callback({ state: true }))
        }
    };
});

describe('Controlador de Usuarios', () => {
    let request, response;

    beforeEach(() => {
        request = { body: {}, query: {}, params: {} };
        response = {
            json: jest.fn()
        };
    });

    // =============================================
    // Tests para Registrar
    // =============================================
    describe('Registrar', () => {
        test('Debería fallar sin nombre', () => {
            request.body = { email: 'test@test.com', password: '123' };
            usuariosController.Registrar(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El nombre es requerido"
            });
        });

        test('Debería fallar sin email', () => {
            request.body = { nombre: 'Test', password: '123' };
            usuariosController.Registrar(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El email es requerido"
            });
        });

        test('Debería fallar sin password', () => {
            request.body = { nombre: 'Test', email: 'test@test.com' };
            usuariosController.Registrar(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El password es requerido"
            });
        });

        
    });

    // =============================================
    // Tests para ListarTodos
    // =============================================
    describe('ListarTodos', () => {
        test('Debería retornar lista de usuarios', () => {
            usuariosController.ListarTodos(request, response);
            expect(response.json).toHaveBeenCalled();
        });
    });

    // =============================================
    // Tests para ListarUnico
    // =============================================
    describe('ListarUnico', () => {
        test('Debería fallar sin email', () => {
            usuariosController.ListarUnico(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El email es requerido"
            });
        });

        test('Debería buscar usuario por email', () => {
            request.body = { email: 'test@test.com' };
            usuariosController.ListarUnico(request, response);
            expect(response.json).toHaveBeenCalled();
        });
    });

    // =============================================
    // Tests para Actualizar
    // =============================================
    describe('Actualizar', () => {
        test('Debería fallar sin nombre', () => {
            usuariosController.Actualizar(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El nombre es requerido"
            });
        });

        test('Debería fallar sin email', () => {
            request.body = { nombre: 'Test' };
            usuariosController.Actualizar(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El email es requerido"
            });
        });

        test('Debería fallar sin estado', () => {
            request.body = { nombre: 'Test', email: 'test@test.com' };
            usuariosController.Actualizar(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El estado es requerido"
            });
        });

        test('Debería actualizar con datos válidos', () => {
            request.body = { nombre: 'Test', email: 'test@test.com', estado: 'Active' };
            usuariosController.Actualizar(request, response);
            expect(response.json).toHaveBeenCalled();
        });
    });

    // =============================================
    // Tests para Borrar
    // =============================================
    describe('Borrar', () => {
        test('Debería fallar sin email', () => {
            usuariosController.Borrar(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El email es requerido"
            });
        });

        test('Debería borrar con email válido', () => {
            request.query = { email: 'test@test.com' };
            usuariosController.Borrar(request, response);
            expect(response.json).toHaveBeenCalled();
        });
    });

    // =============================================
    // Tests para Login
    // =============================================
    describe('Login', () => {
        test('Debería fallar sin email', () => {
            usuariosController.Login(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El email es requerido"
            });
        });

        test('Debería fallar sin password', () => {
            request.body = { email: 'test@test.com' };
            usuariosController.Login(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El password es requerido"
            });
        });

        test('Debería hacer login con credenciales válidas', () => {
            request.body = { email: 'test@test.com', password: '123' };
            usuariosController.Login(request, response);
            expect(response.json).toHaveBeenCalled();
        });

        test('Debería fallar con cuenta inactiva', () => {
            usuariosModel.Login = jest.fn((post, callback) => callback([{ estado: "Inactive", nombre: "Test User" }]));
            request.body = { email: 'test@test.com', password: '123' };
            usuariosController.Login(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "Tu cuenta esta inactiva, vea al correo para activarla"
            });
        });
    });

    // =============================================
    // Tests para Activar
    // =============================================
    describe('Activar', () => {
        test('Debería fallar sin email', () => {
            usuariosController.Activar(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El email es requerido"
            });
        });

        test('Debería fallar sin código', () => {
            request.params = { email: 'test@test.com' };
            usuariosController.Activar(request, response);
            expect(response.json).toHaveBeenCalledWith({
                state: false,
                mensaje: "El código es requerido"
            });
        });

        test('Debería activar con datos válidos', () => {
            request.params = { email: 'test@test.com', codigo: 'G-12345' };
            usuariosController.Activar(request, response);
            expect(response.json).toHaveBeenCalled();
        });
    });
});