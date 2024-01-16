import { Request, Response } from 'express';
import {entitiesArray , updateEntitiesArray, requestReceived} from '../const';

/**
 * @swagger
 * /api/entities:
 *   get:
 *     summary: Obtiene todas las entidades filtradas por un término de búsqueda.
 *     description: Devuelve una lista de entidades basada en el parámetro de búsqueda proporcionado.
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         description: Término de búsqueda para filtrar las entidades.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito. Devuelve una lista de entidades filtradas o no filtradas.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: EjemploEntidad1
 *                 description: Descripción de la Entidad1
 *               - id: 2
 *                 name: EjemploEntidad2
 *                 description: Descripción de la Entidad2
 *       400:
 *         description: Error de solicitud. El parámetro 'search' no se proporcionó.
 *         content:
 *           application/json:
 *             example:
 *               error: No se envió el parámetro "search".
 */
export const getAllEntities = (req: Request, res: Response) => {
  const { search } = req.query;

  if (search === undefined || search === null ) {
    // Si no se envió el parámetro 'search', devuelve un código de estado 400 y un mensaje de error
    return res.status(400).json({ error: 'No se envió el parámetro "search".' });
  }

  if (search !== '') {
    const filteredEntities = entitiesArray.filter((entity) =>
      entity.name.toLowerCase().includes((search as string).toLowerCase())
    );
    res.json(filteredEntities);
  } else {
    res.json(entitiesArray);
  }
};

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Obtiene todas las solicitudes recibidas.
 *     description: Devuelve una lista de todas las solicitudes recibidas hasta el momento.
 *     responses:
 *       200:
 *         description: Éxito. Devuelve una lista de solicitudes recibidas.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 method: GET
 *                 url: "/api/entities"
 *                 status: 200
 *                 elapsed: 100
 *                 date: "2024-01-15T12:00:00Z"
 *               - id: 2
 *                 method: POST
 *                 url: "/api/entities"
 *                 status: 201
 *                 elapsed: 150
 *                 date: "2024-01-15T12:30:00Z"
 */
export const getAllReuqest = (req: Request, res: Response) => {
  res.json(requestReceived);
};

/**
 * @swagger
 * /api/createEntity:
 *   post:
 *     summary: Crea una nueva entidad.
 *     description: Crea una nueva entidad con el nombre y la descripción proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la entidad.
 *               description:
 *                 type: string
 *                 description: Descripción de la entidad.
 *             example:
 *               name: Nueva Entidad
 *               description: Descripción de la nueva entidad.
 *     responses:
 *       201:
 *         description: Éxito. La entidad ha sido creada satisfactoriamente.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Nueva Entidad
 *               description: Descripción de la nueva entidad.
 *       400:
 *         description: Error de solicitud. Debe proporcionar name y description en el cuerpo de la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               error: Debe proporcionar name y description.
 */

export const createEntity = (req: Request, res: Response) => {
  const { name, description } = req.body;
  // Validar que se proporcionen name y description
  if (!name || !description) {
    return res.status(400).json({ error: 'Debe proporcionar name y description' });
  }
  // Crear nueva entidad
  const newEntity = {
    id: entitiesArray.length + 1,
    name,
    description,
  };
  // Agregar la nueva entidad al array
  entitiesArray.push(newEntity);
  // Respondemos con la nueva entidad creada
  res.status(201).json(newEntity);
};

/**
 * @swagger
 * /api/deleteEntities:
 *   delete:
 *     summary: Elimina entidades según los IDs proporcionados.
 *     description: Elimina las entidades cuyos IDs se proporcionan en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: number
 *             example:
 *               - 1
 *               - 2
 *     responses:
 *       200:
 *         description: Éxito. Entidades eliminadas correctamente.
 *         content:
 *           application/json:
 *             example:
 *               - id: 3
 *                 name: Entidad3
 *                 description: Descripción de Entidad3
 *       400:
 *         description: Error de solicitud. Debe proporcionar al menos un ID de entidad para eliminar.
 *         content:
 *           application/json:
 *             example:
 *               error: Debe proporcionar al menos un ID de entidad para eliminar.
 *       404:
 *         description: No se encontraron entidades para eliminar con los IDs proporcionados.
 *         content:
 *           application/json:
 *             example:
 *               error: No se encontraron entidades para eliminar con los IDs proporcionados.
 */

export const deleteEntities = (req: Request, res: Response) => {
  const entityIds: number[] = req.body;
  // Validar que se proporcionen IDs
  if (!entityIds || entityIds.length === 0) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un ID de entidad para eliminar' });
  }
  // Filtrar el array para excluir las entidades con los IDs proporcionados
  const entitiesAfterDeletion = entitiesArray.filter(entity => !entityIds.includes(entity.id));
  // Comprobar si se encontró al menos una entidad
  if (entitiesAfterDeletion.length === entitiesArray.length) {
    return res.status(404).json({ error: 'No se encontraron entidades para eliminar con los IDs proporcionados' });
  }
  updateEntitiesArray(entitiesAfterDeletion);
  res.status(200).json(entitiesAfterDeletion);
};

/**
 * @swagger
 * /api/editEntity/:id:
 *   put:
 *     summary: Edita una entidad existente.
 *     description: Edita la entidad con el ID proporcionado utilizando los datos proporcionados en el cuerpo de la solicitud.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la entidad que se desea editar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre de la entidad.
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la entidad.
 *             example:
 *               name: Nuevo Nombre
 *               description: Nueva descripción de la entidad.
 *     responses:
 *       200:
 *         description: Éxito. La entidad ha sido editada correctamente.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Nuevo Nombre
 *               description: Nueva descripción de la entidad.
 *       400:
 *         description: Error de solicitud. Debe proporcionar name y description en el cuerpo de la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               error: Debe proporcionar name y description.
 *       404:
 *         description: No se encontró la entidad con el ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               error: Entidad no encontrada.
 */

export const editEntity = (req: Request, res: Response) => {
  const entityId: number = Number(req.params.id);
  const { name, description } = req.body;
  // Validar que se proporcionen name y description
  if (!name || !description) {
    return res.status(400).json({ error: 'Debe proporcionar name y description' });
  }
  // Buscar el índice del objeto en el array que coincide con el ID
  const entityIndex = entitiesArray.findIndex((entity) => entity.id === entityId);
  if (entityIndex === -1) {
    return res.status(404).json({ error: 'Entidad no encontrada' });
  }
  entitiesArray[entityIndex] = {
    ...entitiesArray[entityIndex],
    name,
    description,
  };
  res.status(200).json(entitiesArray[entityIndex]);
};
