import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';

import {
	AppLoadService,
	BorrarDestinoAction,
	ElegidoFavoritoAction,
	InitFromDexieAction,
	NuevoDestinoAction,
	TrackClickAction,
	initializeDestinosViajeState,
	reducerDestinosViajes,
} from './destinos-viajes-state.model';
import { DestinoViaje } from './destino-viaje.model';
import { DexieService } from '../services/dexie.service';

describe('DestinosViajesState (spec unico)', () => {
	it('debe inicializar estado por defecto', () => {
		const state = initializeDestinosViajeState();

		expect(state.items).toEqual([]);
		expect(state.loading).toBe(false);
		expect(state.favorito).toBeNull();
		expect(state.trackingTagsCount).toEqual({});
	});

	it('debe agregar un destino con NuevoDestinoAction', () => {
		const destino = new DestinoViaje('Berlin', 'https://img/berlin.jpg');

		const nextState = reducerDestinosViajes(
			initializeDestinosViajeState(),
			new NuevoDestinoAction(destino)
		);

		expect(nextState.items).toHaveLength(1);
		expect(nextState.items[0].nombre).toBe('Berlin');
	});

	it('debe elegir favorito con ElegidoFavoritoAction', () => {
		const destino = new DestinoViaje('Roma', 'https://img/roma.jpg');

		const nextState = reducerDestinosViajes(
			initializeDestinosViajeState(),
			new ElegidoFavoritoAction(destino)
		);

		expect(nextState.favorito?.nombre).toBe('Roma');
	});

	it('debe borrar destino y limpiar favorito si corresponde', () => {
		const destinoA = new DestinoViaje('Madrid', 'https://img/madrid.jpg');
		const destinoB = new DestinoViaje('Lima', 'https://img/lima.jpg');

		const stateConDatos = {
			...initializeDestinosViajeState(),
			items: [destinoA, destinoB],
			favorito: destinoA,
		};

		const nextState = reducerDestinosViajes(
			stateConDatos,
			new BorrarDestinoAction(destinoA)
		);

		expect(nextState.items).toHaveLength(1);
		expect(nextState.items[0].nombre).toBe('Lima');
		expect(nextState.favorito).toBeNull();
	});

	it('debe acumular clicks por tag', () => {
		const state1 = reducerDestinosViajes(
			initializeDestinosViajeState(),
			new TrackClickAction('btn-reservar')
		);

		const state2 = reducerDestinosViajes(state1, new TrackClickAction('btn-reservar'));

		expect(state2.trackingTagsCount['btn-reservar']).toBe(2);
	});
});

describe('AppLoadService (spec unico)', () => {
	it('debe cargar desde Dexie y despachar InitFromDexieAction', async () => {
		const dispatch = vi.fn();
		const toArray = vi.fn().mockResolvedValue([
			{ nombre: 'Bogota', imagenUrl: 'https://img/bogota.jpg' },
			{ nombre: 'Quito', imagenUrl: 'https://img/quito.jpg' },
		]);

		TestBed.configureTestingModule({
			providers: [
				AppLoadService,
				{ provide: Store, useValue: { dispatch } },
				{ provide: DexieService, useValue: { destinos: { toArray } } },
			],
		});

		const service = TestBed.inject(AppLoadService);
		await service.intializeDestinosViajesState();

		expect(dispatch).toHaveBeenCalledTimes(1);
		const action = dispatch.mock.calls[0][0] as InitFromDexieAction;
		expect(action).toBeInstanceOf(InitFromDexieAction);
		expect(action.destinos).toHaveLength(2);
		expect(action.destinos[0]).toBeInstanceOf(DestinoViaje);
	});

	it('si Dexie falla, debe despachar InitFromDexieAction con lista vacia', async () => {
		const dispatch = vi.fn();
		const toArray = vi.fn().mockRejectedValue(new Error('Dexie unavailable'));

		TestBed.configureTestingModule({
			providers: [
				AppLoadService,
				{ provide: Store, useValue: { dispatch } },
				{ provide: DexieService, useValue: { destinos: { toArray } } },
			],
		});

		const service = TestBed.inject(AppLoadService);
		await service.intializeDestinosViajesState();

		expect(dispatch).toHaveBeenCalledTimes(1);
		const action = dispatch.mock.calls[0][0] as InitFromDexieAction;
		expect(action).toBeInstanceOf(InitFromDexieAction);
		expect(action.destinos).toEqual([]);
	});
});
