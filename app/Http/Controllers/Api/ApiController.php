<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
  

    public function inscription(Request $request)
{
    try {
        $validateUser = Validator::make($request->all(), [
            'name' => 'required',
            'surname' => 'required',
            'phone_number' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'role_ids' => 'required|array',
            'role_ids.*' => 'exists:role,id_role',
            'departement_ids' => 'required|exists:departement,id_departement',
            
            
        ]);

        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateUser->errors()
            ], 400);
        }

        $existingUser = User::where('email', $request->email)->first();

        if ($existingUser) {
            return response()->json([
                'status' => false,
                'message' => 'User already registered with this email',
            ], 401);
        }

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => $request->password,
        ]);

        // Attach roles and departements to the user
        $user->role()->attach($request->role_ids);
        $user->departement()->attach($request->departement_ids);
      

        return response()->json([
            'status' => true,
            'message' => 'User created successfully',
            'token' => $user->createToken("API TOKEN")->plainTextToken
        ], 200);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage(),
        ], 500);
    }
}

    public function connexion(Request $request){
        try{ 
            
            $validateUser = Validator::make($request ->all(),
            [
                'email' => 'required|email',
                'password' => 'required',
    
    
    
            ]);
            if ($validateUser ->fails()){
                return response()->json([
                    'status'=> false,
                    'message'=>'validation error',
                    'errors'=>$validateUser ->errors()
    
    
                ],401);
            }

            if(!Auth::attempt($request->only(['email','password']) )){
                return response()->json([
                    'status'=> false,
                    'message'=>'email and password doest not match with our record ',
                ],401);
            }

            $user = User::where('email',$request->email)->first();
           
           
            return response()->json([
                'status'=> true,
                'id' => $user->id,
                'message'=>'User connected succesfullly',
                'token' => $user->createToken("API TOKEN")->plainTextToken
    
    
            ],200);
            


        }
        catch(\Throwable $th){
        return response()->json([
            'status'=> false,
            'message'=>$th->getMessage() ,
            
        ],500);
    }
}
public function profile()
{  $user = Auth::user();

    $role = $user->role->pluck('nom_role');
    $departement = $user->departement->pluck('nom_departement');

    return response()->json([
        'status' => true,
        'message' => 'Profile Info',
        'data' => [
            'id' => $user->id,
            'name' => $user->name,
            'surname' => $user->surname,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'role' => $role,
            'departement' => $departement,
        ],
    ], 200);
}

public function logout(){
    auth()->user()->tokens->each(function ($token) {
        $token->delete();
    });

    return response()->json([
        'status'=> true,
        'message'=>'User logged out',
        'data' => [],
    ],200);

    
}


public function checkAdmin(Request $request)
{
    try {
        $user = $request->user();

        if ($user->type2 == 'admin') {
            return response()->json([
                'status' => true,
                'isAdmin' => true,
                'id' => $user->id, // Return the user ID
            ], 200);
        }

        return response()->json([
            'status' => true,
            'isAdmin' => false,
            'id' => $user->id, // Return the user ID
        ], 200);

    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage(),
        ], 500);
    }
}

public function verifyToken(Request $request)
{
    try {
        $token = $request->header('Authorization');

        if (!$token || !Str::startsWith($token, 'Bearer ')) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid token format',
            ], 401);
        }

        $token = Str::after($token, 'Bearer '); // Remove 'Bearer ' prefix

        // Retrieve the hashed token from the database (assuming it's stored there)
        $user = User::whereHas('tokens', function ($query) use ($token) {
            $query->where('id', $token); // Check for the ID instead of the token
        })->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid token',
            ], 401);
        }

        // Check if the user is an admin
        if ($user->type2 === 'admin') {
            return response()->json([
                'status' => true,
                'isAdmin' => true,
            ], 200);
        }

        return response()->json([
            'status' => true,
            'isAdmin' => false,
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}



    



    public function listUsers(Request $request)
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized. Please log in.'], 401);
        }
    
        // Check if user is an admin
        if ($request->user()->type2 !== 'admin') {
            return response()->json(['error' => 'Unauthorized. Only administrators can access this resource.'], 403);
        }
        $users = User::where('type2', 'admin')->get();// Only include admin users
        $users = User::all()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'surname' => $user->surname,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'role' => $user->role->pluck('nom_role'),
                'departement' => $user->departement->pluck('nom_departement'),
            ];
        });
        return response()->json([
            'status' => true,
            'message' => 'List of all users',
            'data' => $users,
        ], 200);
    }

    public function createUser(Request $request)
{
    if (auth()->user()->type2 !== 'admin') {
        return response()->json(['error' => 'Unauthorized. Only administrators can create users.'], 403);
    }
    
        // Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'surname' => 'required',
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'required',
            'password' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 400);
        }
    
        // Create the user
        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
        ]);
    
        return response()->json([
            'status' => true,
            'message' => 'User created successfully',
            'data' => $user,
        ], 201);
    }
public function updateUser(Request $request, $id)
{
    if (auth()->user()->type2 !== 'admin') {
        return response()->json(['error' => 'Unauthorized. Only administrators can update users.'], 403);
    }
    $user = User::findOrFail($id);

    // Validation
    $validator = Validator::make($request->all(), [
        'name' => 'nullable',
        'surname' => 'nullable',
        'email' => 'nullable|email|unique:users,email,' . $user->id,
        'phone_number' => 'nullable',
        'password' => 'nullable',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'Validation error',
            'errors' => $validator->errors(),
        ], 400);
    }

    // Update the user
    $user->name = $request->name;
    $user->surname = $request->surname;
    $user->email = $request->email;
    $user->phone_number = $request->phone_number;
    $user->password = Hash::make($request->password);
    $user->save();

    return response()->json([
        'status' => true,
        'message' => 'User updated successfully',
        'data' => $user,
    ], 200);
}

public function deleteUser($id)
{
    if (auth()->user()->type2 !== 'admin') {
        return response()->json(['error' => 'Unauthorized. Only administrators can create users.'], 403);
    }
    $user = User::findOrFail($id);
    $user->delete();

    return response()->json([
        'status' => true,
        'message' => 'User deleted successfully',
        'data' => [],
    ], 200);
}


// DEPARTEMENT ET ROLE MODIF

public function updateUserDepartement(Request $request, $id)
{
    $user = User::findOrFail($id);

    // Validation
    $validator = Validator::make($request->all(), [
        'departement_ids' => 'required|array',
        'departement_ids.*' => 'exists:departement,id_departement',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'Validation error',
            'errors' => $validator->errors(),
        ], 400);
    }

    // Sync user's departements
    $user->departement()->sync($request->departement_ids);

    return response()->json([
        'status' => true,
        'message' => 'User departement updated successfully',
        'data' => $user,
    ], 200);
}

public function updateUserRole(Request $request, $id)
{
    $user = User::findOrFail($id);

    // Validation
    $validator = Validator::make($request->all(), [
        'role_ids' => 'required|array',
        'role_ids.*' => 'exists:role,id_role',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'Validation error',
            'errors' => $validator->errors(),
        ], 400);
    }

    // Sync user's roles
    $user->role()->sync($request->role_ids);

    return response()->json([
        'status' => true,
        'message' => 'User roles updated successfully',
        'data' => $user,
    ], 200);
}
public function getUserDetails($id) {
    try {
        
        
        $user = User::findOrFail($id);
       

    $role = $user->role->pluck('nom_role');
    $departement = $user->departement->pluck('nom_departement');

    return response()->json([
        'status' => true,
        'message' => 'Profile Info',
        'data' => [
            'id' => $user->id,
            'name' => $user->name,
            'surname' => $user->surname,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'role' => $role,
            'departement' => $departement,
        ],
    ], 200);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => 'User not found'
        ], 404);
    }
}

public function checkUserRoleAndDepartment(Request $request)
{
    try {
        $user = $request->user()->load('role', 'departement');

        $role = $user->role ? $user->role->pluck('nom_role', 'id_role')->toArray() : [];
        $departement = $user->departement ? $user->departement->pluck('nom_departement', 'id_departement')->toArray() : [];

        return response()->json([
            'status' => true,
            'role' => $role,
            'department' => $departement,
        ], 200);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage(),
        ], 500);
    }
}
public function user()
{
    return response()->json(['message' => 'Welcome User']);
}

public function admin()
{
    return response()->json(['message' => 'Welcome Admin']);
}

public function manager()
{
    return response()->json(['message' => 'Welcome Manager']);
}



}




