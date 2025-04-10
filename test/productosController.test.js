const productosController =
  require("../api/controladores/productosController").productosController;
const productosModel = require("../api/modelos/productosModel").productosModel;
const mongoose = require("mongoose");

describe("Productos Controller", () => {
  let request, response;

  beforeEach(() => {
    request = { body: {}, query: {}, params: {} };
    response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  // Tests Guardar
  describe("Guardar Producto", () => {
    test("Requerir imagen", () => {
      request.body = {
        titulo: "titulo",
        precio: 900,
        material: "material",
        categoria: "productos",
      };

      productosController.Guardar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "La imagen es requerida",
      });
    });

    test("Requerir título", () => {
      request.body = {
        imagen: "imagen.jpg",
        precio: 900,
        material: "material",
        categoria: "productos",
      };

      productosController.Guardar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "El título es requerido",
      });
    });

    test("Requerir precio", () => {
      request.body = {
        imagen: "imagen.jpg",
        titulo: "titulo",
        material: "material",
        categoria: "productos",
      };

      productosController.Guardar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "El precio es requerido",
      });
    });

    test("Requerir material", () => {
      request.body = {
        imagen: "imagen.jpg",
        titulo: "titulo",
        precio: 900,
        categoria: "productos",
      };

      productosController.Guardar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "El material es requerido",
      });
    });

    test("Requerir categoría", () => {
      request.body = {
        imagen: "imagen.jpg",
        titulo: "titulo",
        precio: 900,
        material: "material",
      };

      productosController.Guardar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "La categoría es requerida",
      });
    });
  });

  // Tests Listartitulo

  describe("Listar Producto por Título", () => {
    test("Requerir Título", () => {
      productosController.Listartitulo(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "El título es requerido",
      });
    });
  });

  // Tests Actualizar
  describe("Actualizar Producto", () => {
    test("Requerir imagen", () => {
      request.body = {
        titulo: "titulo",
        precio: 900,
        material: "material",
        categoria: "productos",
      };

      productosController.Actualizar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "La imagen es requerida",
      });
    });

    test("Requerir título", () => {
      request.body = {
        imagen: "imagen.jpg",
        precio: 900,
        material: "material",
        categoria: "productos",
      };

      productosController.Actualizar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "El título es requerido",
      });
    });

    test("Requerir precio", () => {
      request.body = {
        imagen: "imagen.jpg",
        titulo: "titulo",
        material: "material",
        categoria: "productos",
      };

      productosController.Actualizar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "El precio es requerido",
      });
    });

    test("Requerir material", () => {
      request.body = {
        imagen: "imagen.jpg",
        titulo: "titulo",
        precio: 900,
        categoria: "productos",
      };

      productosController.Actualizar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "El material es requerido",
      });
    });

    test("Requerir categoría", () => {
      request.body = {
        imagen: "imagen.jpg",
        titulo: "titulo",
        precio: 900,
        material: "material",
      };

      productosController.Actualizar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "La categoría es requerida",
      });
    });
  });

  // Tests Borrar
  describe("Borrar Producto", () => {
    test("Requerir Título", () => {
      productosController.Borrar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "El título es requerido",
      });
    });
  });
});