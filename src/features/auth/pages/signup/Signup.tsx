import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useUserStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  signupSchema,
  type SignupValues,
} from "../../../../types/signupSchema";

const Signup = () => {
  const navigate = useNavigate();
  const setSignupData = useUserStore((state) => state.setSignupData);
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      termsAccepted: false,
    },
  });

  const onSubmit = (values: SignupValues) => {
    setSignupData(values);
    navigate("/user/overview");
    // Aquí podrías agregar la lógica para enviar los datos al backend
    console.log("Formulario enviado:", values);
  };

  return (
    <div className="container mx-auto min-h-screen py-8 flex items-center justify-center">
      <div className="flex bg-white shadow-xl rounded-3xl overflow-hidden items-stretch">
        <div>
          <img
            src="/images/auth/AuthFoodImage.png"
            alt="Food Image"
            className="object-cover h-full flex-1"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 px-24 py-14 w-[30rem]">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-end">
              <span className="text-[51px] [font-family:'Cookie',sans-serif] text-[#324001]">
                Foraneos
                <span className="text-lg relative top-2 [font-family:'RibeyeMarrow']">
                  IA
                </span>
              </span>
            </div>
            <span className="text-center">
              Bienvenido a nuestra web, inicia sesión para continuar
            </span>
          </div>
          <Button className="cursor-pointer w-full">
            <svg
              enable-background="new 0 0 128 128"
              id="Social_Icons"
              version="1.1"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="_x31__stroke">
                <g id="Google">
                  <rect
                    clip-rule="evenodd"
                    fill="none"
                    fill-rule="evenodd"
                    height="128"
                    width="128"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648    C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64"
                    fill="#FBBC05"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16    C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182"
                    fill="#EA4335"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937    L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221    C80.964,99.86,73.689,101.818,65.457,101.818"
                    fill="#34A853"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727    h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64"
                    fill="#4285F4"
                    fill-rule="evenodd"
                  />
                </g>
              </g>
            </svg>
            Continuar con Google
          </Button>
          <div className="flex items-center justify-center gap-2 w-[10rem] mx-auto">
            <div className="h-[0.2px] bg-[#9A9A9AA8] flex-1"></div>
            <span className="text-[#9A9A9AA8]">O</span>
            <div className="h-[0.2px] bg-[#9A9A9AA8] flex-1"></div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Nombres"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Apellidos"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Correo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Contraseña"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-center gap-2">
                    <div className="flex gap-2">
                      <FormControl>
                        <Checkbox
                          id="termsAccepted"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel htmlFor="termsAccepted">
                        Términos y condiciones
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="uppercase cursor-pointer w-full bg-[#D2EBBC] text-black font-bold border border-black rounded-lg py-3 shadow-lg hover:bg-[#bcebc0] hover:scale-[1.03] transition-all duration-200">
                Registrarse
              </Button>
            </form>
          </Form>
          <p className="flex items-center justify-center gap-2 text-xs ">
            ¿Tienes una cuenta creada?
            <Link to="/login">
              <span className="text-yellow-500">Iniciar sesión</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
