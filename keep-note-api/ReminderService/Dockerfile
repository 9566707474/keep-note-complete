#base image for dotnet sdk
FROM microsoft/dotnet:sdk as build
WORKDIR /app

#copy *.csproj and restore as distinct layer
COPY *.csproj ./
RUN dotnet restore

# copy everything else and build app
COPY . ./
WORKDIR /app
RUN dotnet publish -c Release -o out


FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet","ReminderService.dll"]