from django.http import JsonResponse
from .models import *
from django.shortcuts import render
from django.http import QueryDict


def Home(request):
  return render(request, 'index.html')
  

def add_grocery_item(request):
  
  if request.method == 'POST':
    name=request.POST['name']
    quantity = request.POST['quantity']
    price = request.POST['price']
    data = GroceryItem.objects.filter(name=name)
    if len(data) == 1:
      return JsonResponse({"res":"failed",'msg':"Name and quantity is already Exists!"})
    else:
      GroceryItem.objects.create(name=name,quantity=quantity,price=price)
      return JsonResponse({"res":"success","msg":"Item added Successfully!"})
          
  elif request.method == "GET":
    data =GroceryItem.objects.all()
    api = []
    for i in data:
      api.append({"pk":i.id,"name":i.name,"quantity":i.quantity,"price":i.price})
    return JsonResponse(api,safe=False)
    
  elif request.method == "PUT":
    put = QueryDict(request.body)
    edit = GroceryItem.objects.get(id=put.get('pk'))
    edit.name=put.get('edit_name')
    edit.quantity=put.get('edit_quantity')
    edit.price=put.get('edit_price')
    edit.save()
    return JsonResponse({"res":"success","msg":"Updated Successfully!"})
    
  elif request.method == "DELETE":
    delete = QueryDict(request.body)
    sft =GroceryItem.objects.get(pk=delete.get('pk'))
    sft.delete()
    return JsonResponse({"res":"success","msg":"Deleted Succesfully"})
      
