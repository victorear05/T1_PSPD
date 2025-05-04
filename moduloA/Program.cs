using GrpcServerA.Services;
using Microsoft.AspNetCore.Server.Kestrel.Core;

var builder = WebApplication.CreateBuilder(args);

// Força o uso de HTTP/2 sem HTTPS (para compatibilidade com grpc-js)
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http2;
    });
});

builder.Services.AddGrpc();

var app = builder.Build();

// Mapeia o serviço gRPC implementado
app.MapGrpcService<ProductServiceImpl>();

// Endpoint opcional para acessar no navegador
app.MapGet("/", () => "Este serviço é gRPC. Use um client gRPC para se conectar.");

app.Run();
