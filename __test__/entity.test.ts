import request from 'supertest';
import app from '../src/index';
import { entitiesArray, updateEntitiesArray } from '../src/const';

describe('Entity Controller - getAllEntities', () => {
  it('should return all entities when no search parameter is provided', async () => {
    const response = await request(app).get('/api/entities');
    expect(response.status).toBe(400);

    // Verifica que la respuesta devuelva error
    expect(response.body).toEqual({"error": "No se envió el parámetro \"search\"."});
  });

  it('should return filtered entities when search parameter is provided', async () => {
    // Supongamos que tienes al menos una entidad en entitiesArray
    const searchQuery = 'Entity 1';
    const response = await request(app).get(`/api/entities?search=${searchQuery}`);
    expect(response.status).toBe(200);

    // Verifica que la respuesta contenga solo las entidades que coincidan con el criterio de búsqueda
    const filteredEntities = entitiesArray.filter(entity =>
      entity.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    expect(response.body).toEqual(filteredEntities);
  });

  it('should return an empty array when no matching entities are found with search parameter', async () => {
    // Supongamos que no hay entidades que coincidan con la búsqueda
    const searchQuery = 'notMatching';
    const response = await request(app).get(`/api/entities?search=${searchQuery}`);
    expect(response.status).toBe(200);

    // Verifica que la respuesta sea un array vacío
    expect(response.body).toEqual([]);
  });
});

describe('Data Controller - createEntity', () => {
  it('should create an entity', async () => {
    const entityData = {
      name: 'TestEntity',
      description: 'TestDescription',
    };

    const response = await request(app)
      .post('/api/createEntity')
      .send(entityData);

    expect(response.status).toBe(201);

    // Verifica que la respuesta contenga la nueva entidad creada
    expect(response.body).toEqual(expect.objectContaining({ id: expect.any(Number) }));

    // Verifica que la nueva entidad esté presente en el array entitiesArray
    const createdEntity = entitiesArray.find(entity => entity.id === response.body.id);
    expect(createdEntity).toEqual(expect.objectContaining(entityData));
  });

  it('should return 400 if name or description is missing', async () => {
    const response = await request(app).post('/api/createEntity').send({});

    expect(response.status).toBe(400);

    // Verifica que la respuesta contenga el mensaje de error esperado
    expect(response.body).toEqual({ error: 'Debe proporcionar name y description' });
  });
});


describe('Data Controller - deleteEntities', () => {
  beforeEach(() => {
    // Reinicia entitiesArray antes de cada prueba
    updateEntitiesArray([
      { id: 1, name: 'Entity1', description: 'Description1' },
      { id: 2, name: 'Entity2', description: 'Description2' },
    ]);
  });

  it('should delete entities with provided IDs', async () => {
    const entityIdsToDelete = [1];

    const response = await request(app)
      .delete('/api/deleteEntities')
      .send(entityIdsToDelete);

    expect(response.status).toBe(200);

    // Verifica que la respuesta contenga el array actualizado después de la eliminación
    expect(response.body).toEqual(entitiesArray);
  });

  it('should return 404 if no entities are found with provided IDs', async () => {
    const nonExistingEntityIds = [100, 200];

    const response = await request(app)
      .delete('/api/deleteEntities')
      .send(nonExistingEntityIds);

    expect(response.status).toBe(404);

    // Verifica que la respuesta contenga el mensaje de error esperado
    expect(response.body).toEqual({ error: 'No se encontraron entidades para eliminar con los IDs proporcionados' });
  });

  it('should return 400 if no entity IDs are provided', async () => {
    const response = await request(app)
      .delete('/api/deleteEntities')
      .send([]);

    expect(response.status).toBe(400);

    // Verifica que la respuesta contenga el mensaje de error esperado
    expect(response.body).toEqual({ error: 'Debe proporcionar al menos un ID de entidad para eliminar' });
    });
});

describe('Data Controller - editEntity', () => {
  beforeEach(() => {
    // Reinicia entitiesArray antes de cada prueba
    updateEntitiesArray([
      { id: 1, name: 'Entity1', description: 'Description1' },
      { id: 2, name: 'Entity2', description: 'Description2' },
    ]);
  });

  it('should edit an existing entity', async () => {
    const entityIdToEdit = 1;
    const updatedEntityData = { name: 'UpdatedName', description: 'UpdatedDescription' };

    const response = await request(app)
      .put(`/api/editEntity/${entityIdToEdit}`)
      .send(updatedEntityData);

    expect(response.status).toBe(200);

    // Verifica que la respuesta contenga la entidad actualizada
    expect(response.body).toEqual(expect.objectContaining(updatedEntityData));

    // Verifica que la entidad en entitiesArray se haya actualizado correctamente
    const editedEntity = entitiesArray.find(entity => entity.id === entityIdToEdit);
    expect(editedEntity).toEqual(expect.objectContaining(updatedEntityData));
  });

  it('should return 404 if entity to edit is not found', async () => {
    const nonExistingEntityId = 100;
    const updatedEntityData = { name: 'UpdatedName', description: 'UpdatedDescription' };

    const response = await request(app)
      .put(`/api/editEntity/${nonExistingEntityId}`)
      .send(updatedEntityData);

    expect(response.status).toBe(404);

    // Verifica que la respuesta contenga el mensaje de error esperado
    expect(response.body).toEqual({ error: 'Entidad no encontrada' });
  });

  it('should return 400 if name or description is missing', async () => {
    const entityIdToEdit = 1;
    const response = await request(app)
      .put(`/api/editEntity/${entityIdToEdit}`)
      .send({});

    expect(response.status).toBe(400);

    // Verifica que la respuesta contenga el mensaje de error esperado
    expect(response.body).toEqual({ error: 'Debe proporcionar name y description' });
  });
});
