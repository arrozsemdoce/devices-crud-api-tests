<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DeviceController extends Controller
{
    // GET /api/devices
    public function index(Request $request)
    {
        return response()->json(
            DB::table('devices')
                ->whereNull('deleted_at')
                ->get(),
            200
        );
    }

    // POST /api/devices
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string',
            'location'      => 'required|string',
            'purchase_date' => 'nullable|date',
            'in_use'        => 'nullable|boolean',
        ]);

        
        $purchaseDate = isset($validated['purchase_date'])
            ? date('Y-m-d', strtotime($validated['purchase_date']))
            : null;

        $id = DB::table('devices')->insertGetId([
            'user_id'       => 1, // fixo para teste
            'name'          => $validated['name'],
            'location'      => $validated['location'],
            'purchase_date' => $purchaseDate,
            'in_use'        => $validated['in_use'] ?? false,
            'deleted_at'    => null,
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        return response()->json([
            'message' => 'Device criado com sucesso',
            'id'      => $id
        ], 201);
    }

    
    public function toggleUse($id)
    {
        $device = DB::table('devices')
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();

        if (!$device) {
            return response()->json([
                'message' => 'Device not found'
            ], 404);
        }

        DB::table('devices')
            ->where('id', $id)
            ->update([
                'in_use'     => !$device->in_use,
                'updated_at' => now(),
            ]);

        return response()->json([
            'message' => 'Status atualizado'
        ], 200);
    }
}
