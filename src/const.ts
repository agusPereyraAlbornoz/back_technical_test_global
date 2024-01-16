import { RequestReceived } from "./interfaces/RequestReceived";
import { Entity } from "./interfaces/Entity";

export let entitiesArray: Entity[] = [
    { id: 1, name: 'Entity 1', description: 'Description 1' },
    { id: 2, name: 'Entity 2', description: 'Description 2' },
    { id: 3, name: 'Entity 3', description: 'Description 3' },
    { id: 4, name: 'Entity 4', description: 'Description 4' },
    { id: 5, name: 'Entity 5', description: 'Description 5' },
    { id: 6, name: 'Entity 6', description: 'Description 6' },
    { id: 7, name: 'Entity 7', description: 'Description 7' },
    { id: 8, name: 'Entity 8', description: 'Description 8' },
    { id: 9, name: 'Entity 9', description: 'Description 9' },
    { id: 10, name: 'Entity 10', description: 'Description 10' },
];

export let requestReceived: RequestReceived[] = [
    {
        id: 1,
        method: 'GET',
        url: '/api/entities',
        status: 200,
        elapsed: 150,
        date: new Date('2024-01-15T08:30:00Z'),
      },
      {
        id: 2,
        method: 'POST',
        url: '/api/createEntity',
        status: 201,
        elapsed: 200,
        date: new Date('2024-01-15T09:15:00Z'),
      },
      {
        id: 3,
        method: 'PUT',
        url: '/api/editEntity/123',
        status: 204,
        elapsed: 120,
        date: new Date('2024-01-15T10:00:00Z'),
      },
      {
        id: 4,
        method: 'DELETE',
        url: '/api/deleteEntities',
        status: 200,
        elapsed: 180,
        date: new Date('2024-01-15T10:45:00Z'),
      },
];

export const updateEntitiesArray = (newEntities: Entity[]) => {
    entitiesArray = newEntities;
}