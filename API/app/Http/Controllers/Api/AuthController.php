<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{   

    public function editUser(Request $request,User $user)
    {   
           
            $fields = $request->only(
                    'name','email'
            );

            $user->where('email', $request->input('email'))->update([ 'name' => $fields['name'] ]);

            $user = User::where('email','=',$fields['email'])->first();     

            $msg = "Editado com sucesso";
            return response()->json(compact('msg', 'user'));
    }

    public function changePassword(Request $request,User $user)
    {   
           
            $credentials = $request->only(
                    'email','new_password', 'password', 'confirm_password'
            );
         
            $userlogged = User::where('email','=',$credentials['email'])->first();

            if(Hash::check($credentials['password'], $userlogged->password)) {
                $user->where('email', $request->input('email'))->update([ 'password' => bcrypt($credentials['new_password']) ]);

                return response()->json(['msg'=>'Senha alterada com sucesso!']);
            }        

            return response()->json(['msg'=>'Não foi possivel alterar senha!']);
    }

    public function authenticateFacebook(User $user,Request $request)
    {
        $client = new Client();
        $fields = 'id,email,first_name,last_name,picture.type(large),name';
        $profileResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/me', [
        'query' => [
            'access_token' => $request->input('access_token'),
            'fields' => $fields
        ]
        ]);

        $user = $profileResponse->getBody()->getContents();
        $user= json_decode($user, true);
        $userlogged = User::where('email','=',$user['email'])->first();

        if($userlogged){
            $token = JWTAuth::fromUser($userlogged);
            $user =  $userlogged;
        }else{
            $newUser = new User;
            $newUser->email = $user['email'];
            $newUser->name = $user['name'];
            $newUser->fb_id = $user['id'];
            $newUser->photo = $user['picture']['data']['url'];
            $newUser->password = "fuiheifiejfiejf";
            $newUser->save();
            $user =  $newUser;
            $token = JWTAuth::fromUser($user);
        }
       
        return response()->json(compact('token', 'user'));
    }

    public function authenticate(Request $request)
    {
        // grab credentials from the request

        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Login ou senha inválidos!'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // all good so return the token;
        $user = JWTAuth::toUser($token);
        return response()->json(compact('token', 'user'));
    }

    public function getAuthenticatedUser()

    {
	try {

		if (! $user = JWTAuth::parseToken()->authenticate()) {
			return response()->json(['user_not_found'], 404);
		}

	} catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

		return response()->json(['token_expired'], $e->getStatusCode());

	} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

		return response()->json(['token_invalid'], $e->getStatusCode());

	} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

		return response()->json(['token_absent'], $e->getStatusCode());

	}

	// the token is valid and we have found the user via the sub claim
	return response()->json(compact('user'));
}
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['logout']);
    }

    public function register(Request $request, User $user) 
    {
        $userlogged = User::where('email','=',$request->input('email'))->first();
        if($userlogged){
            return response()->json(['msg'=>'Email já cadastrado!']);
        }
        $user->create( $request->all() );
        return response()->json(['msg'=>'Usuário criado com sucesso!']);
    }

    public function recoveryPassword(User $user,Request $request)
    {   
        $pass = md5(rand(0, 100));
        $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
        try {
            //Server settings
            $mail->SMTPDebug = 2;                                 // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'roberto.o.s.f@gmail.com';                 // SMTP username
            $mail->Password = 'amarnaoepecado';                           // SMTP password
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587;                                    // TCP port to connect to
        
            //Recipients
            $mail->setFrom('roberto.o.s.f@gmail.com', 'Myplace');
            $mail->addAddress($request->input('email'));               // Name is optional
          
            //Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Senha Myplace';
            $mail->Body    = 'Sua nova senha é : '.$pass;
            $mail->SMTPDebug = 0;
            $mail->send();
            
        } catch (Exception $e) {
            return response()->json(['msg'=>'Erro ao recuperar senha!']);
        }
        
        $user->where('email', $request->input('email'))->update([ 'password' => bcrypt($pass) ]);        
        return response()->json(['msg'=>'Senha enviada para o email do usuário!']);
    }

}
