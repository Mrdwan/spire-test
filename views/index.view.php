<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spire - test</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/app.css">
</head>
<body class="bg-secondary-light d-flex align-items-center justify-content-center vh-100">
    <div class="bg-light p-4 border rounded shadow-sm">
        <h4>Adress Validator</h4>
        <h5>validate/Standardizes addresses using USPS</ht>        
        <hr>
        <form action="" method="post" onsubmit="validateAddress(event)">
            <div class="form-group">
                <label for="address_1" class="form-label">Address Line 1</label>
                <input type="text" class="form-control" name="address_line_1" id="address_line_1">
            </div>
            <div class="form-group">
                <label for="address_2" class="form-label">Address Line 2</label>
                <input type="text" class="form-control" name="address_line_2" id="address_line_2">
            </div>
            <div class="form-group">
                <label for="city" class="form-label">City</label>
                <input type="text" class="form-control" name="city" id="city">
            </div>
            <div class="form-group">
                <label for="state" class="form-label">State</label>
                <select class="form-control" name="state" id="state">
                    <option value="" class="d-none">(Select)</option>
                    <?php foreach ($states as $key => $name): ?>
                        <option value="<?= $key ?>"><?= $name ?></option>
                    <?php endforeach ?>
                </select>
            </div>
            <div class="form-group">
                <label for="address_1" class="form-label">Zip Code</label>
                <input type="text" class="form-control" name="zip_code" id="zip_code">
            </div>
            <div class="form-group text-center pt-4">
                <button type="submit" class="btn btn-primary shadow-sm">
                    VALIDATE
                </button>
            </div>
        </form>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title fs-5" id="modalLabel">Save Address</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="d-none" id="save-address">
                <span>Which Address format do you want to save?</span>
                <ul class="nav nav-pills mb-3" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="original-tab" data-bs-toggle="pill" data-bs-target="#original" type="button" role="tab" aria-controls="original" aria-selected="true" data-type="original">
                            Original
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="standardized-tab" data-bs-toggle="pill" data-bs-target="#standardized" type="button" role="tab" aria-controls="standardized" aria-selected="false" data-type="standardized">
                            Standardized (USPS)
                        </button>
                    </li>
                </ul>
                <div class="tab-content border p-2">
                    <div class="tab-pane fade show active" id="original" role="tabpanel" aria-labelledby="original-tab" tabindex="0"></div>
                    <div class="tab-pane fade" id="standardized" role="tabpanel" aria-labelledby="standardized-tab" tabindex="0"></div>
                </div>
            </div>

            <div class="alert alert-danger mt-3 d-none" id="error-alert"></div>
            <div class="alert alert-success mt-3 d-none" id="success-alert"></div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="save()">Save</button>
        </div>
        </div>
    </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
    <script src="../assets/app.js"></script>
</body>
</html>